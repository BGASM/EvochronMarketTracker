const fs = require('fs');
const path = require('path');
const dotenvAbsolutePath = path.join(__dirname, '.env');
const { Sequelize } = require('@sequelize/core');
require('dotenv').config({ path: dotenvAbsolutePath });

let express = require('express');
const portfinder = require("portfinder");
let app = express();

const hostname = process.env.APP_HOST || '127.0.0.1';
const port = process.env.APP_PORT || 8080;

const chalk = require('chalk');
var category = fs.readFileSync("./static/savedatacategory.txt", "utf-8").split('\n');
var sorter = require('sorter');
const db = require('./models');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });


class Server {
    dataObject = {};
    updatePending = false;
    lastOutputMessage = null;

    constructor(app, hostname, port) {
        this.app = app;
        this.hostname = hostname;
        this.port = port;
    }

    checkVersion() {
        const versionCheck = require('github-version-checker');
        const { version } = require('./package.json');

        const options = {
            token: '',
            repo: 'EvochronMarketTracker',
            owner: 'BGASM',
            currentVersion: version,
        };

        versionCheck(options, null).then((update) => {
            if (update) { // update is null if there is no update available, so check here
                this.outputMessage("An update is available! " + update.name);
                this.outputMessage("You are on version " + options.currentVersion + "!");
                this.updatePending = true;
            } else {
                this.outputMessage(chalk.green(`You are up to date.`));
            }
        }).catch(function (error) {
            console.error(chalk.red(`Couldn't connect to github server to check updates.`));
        });

        this.outputMessage(chalk.green(`Evochron Market Tracker Server v${version}`));
    }

    serve() {

        let serveStatic = require('serve-static');
        let portfinder = require('portfinder');
        let localIpV4Address = require("local-ipv4-address");

        localIpV4Address().then((ipAddress) => {
            portfinder.getPort({ port: this.port }, (err, port) => {
                this.app.use(serveStatic(__dirname + "/dist"));
                this.app.listen(port, () => {
                    require('child_process').exec(`start http://${this.hostname}:${port}`);
                    this.outputMessage(`*****************************`);
                    this.outputMessage(`** Server running at http://${this.hostname}:${port}/`);
                    this.outputMessage(`** LAN access: http://${ipAddress}:${port}/`);
                    this.outputMessage(`*****************************`);
                });
            });
        });
    }

    dataFeed() {
        this.readFromFile();
    }    

    readFromFile() {
        const chokidar = require('chokidar')

        chokidar.watch(process.env.DEV_FILE_PATH).on('all', (event, path) => {
            fs.readFile(process.env.DEV_FILE_PATH, 'utf8', (err, d) => {
                if (err) {
                    console.error(err)
                    return
                }

                var data = this.parseTextFile(d).replace(/\\r/g, '')                
                this.dataObject = sorter.sorted(JSON.parse(data));
                this.updateEconDB();                                
                this.outputMessage(`${chalk.yellowBright('Development mode')} - reading data from file successful`);
            });
        })
    }

    async updateEconDB() {    
        var d = this.dataObject.econ;
        await db.Region.upsert({
            region_id: parseInt(d.region_index_value.split('=')[1]),
            system: d.closest_gate,
            economy_level: parseInt(d.regional_economy_level),
            control: d.regional_territory_control,
            food_price: parseInt(d.food_price.split('/')[1]),
            food_percent: parseInt(d.food_price.split('/')[2]),
            medical_supplies_price: parseInt(d.medical_supplies_price.split('/')[1]),
            medical_supplies_percent: parseInt(d.medical_supplies_price.split('/')[1]),
            hydrogen_price: parseInt(d.hydrogen_price.split('/')[1]),
            hydrogen_percent: parseInt(d.hydrogen_price.split('/')[2]),
            electronics_price: parseInt(d.electronics_price.split('/')[1]),
            electronics_percent: parseInt(d.electronics_price.split('/')[2],),
            solar_price: parseInt(d.solar_price.split('/')[1]),
            solar_percent: parseInt(d.solar_price.split('/')[2]),
            metal_price: parseInt(d.metal_price.split('/')[1]),
            metal_percent: parseInt(d.metal_price.split('/')[2]),
            diamond_price: parseInt(d.diamond_price.split('/')[1]),
            diamond_percent: parseInt(d.diamond_price.split('/')[2]),
            antimatter_price: parseInt(d.antimatter_price.split('/')[1]),
            antimatter_percent: parseInt(d.antimatter_price.split('/')[2]),
            fusion_price: parseInt(d.fusion_price.split('/')[1]),
            fusion_percent: parseInt(d.fusion_price.split('/')[2]),
            machinery_price: parseInt(d.machinery_price.split('/')[1]),
            machinery_percent: parseInt(d.machinery_price.split('/')[2]),
            textiles_price: parseInt(d.textiles_price.split('/')[1]),
            textiles_percent: parseInt(d.textiles_price.split('/')[2]),
            platinum_price: parseInt(d.platinum_price.split('/')[1]),
            platinum_percent: parseInt(d.platinum_price.split('/')[2]),
            biological_price: parseInt(d.biological_price.split('/')[1]),
            biological_percent: parseInt(d.biological_price.split('/')[2]),
            oxygen_price: parseInt(d.oxygen_price.split('/')[1]),
            oxygen_percent: parseInt(d.oxygen_price.split('/')[2]),
            gold_price: parseInt(d.gold_price.split('/')[1]),
            gold_percent: parseInt(d.gold_price.split('/')[2]),
            silver_price: parseInt(d.silver_price.split('/')[1]),
            silver_percent: parseInt(d.silver_price.split('/')[2]),
            water_price: parseInt(d.water_price.split('/')[1]),
            water_percent: parseInt(d.water_price.split('/')[2]),
            armor_price: parseInt(d.armor_price.split('/')[1]),
            armor_percent: parseInt(d.armor_price.split('/')[2])
        }, {region_id:parseInt(d.region_index_value)})
    }

    parseTextFile(data) {        
        data = data.split('\n')
        var result =  data.reduce(function(result, field, index) {
            result[category[index]] = field;
            return result;
          }, {})        
        return JSON.stringify(result);
    }


    /**
     *
     */
    setApi() {
        this.app.get('/api/data', (req, res) => {
            if (this.dataObject) {
                this.dataObject.updatePending = this.updatePending;
            }
            res.json(this.dataObject);
        });

        this.app.get('/api/econ', (req, res) => {
            return db.Region.findAll({
                attributes: ['region_id','system','economy_level','control','food_price','food_percent','medical_supplies_price','medical_supplies_percent','hydrogen_price','hydrogen_percent','electronics_price','electronics_percent','solar_price','solar_percent','metal_price','metal_percent','diamond_price','diamond_percent','antimatter_price','antimatter_percent','fusion_price','fusion_percent','machinery_price','machinery_percent','textiles_price','textiles_percent','platinum_price','platinum_percent','biological_price','biological_percent','oxygen_price','oxygen_percent','gold_price','gold_percent','silver_price','silver_percent','water_price','water_percent','armor_price','armor_percent']
            })
            .then((regions) => res.json(regions))
            .catch((err) => {
                this.outputMessage(`${chalk.yellowBright('Development mode')} - There was an error querying` + JSON.stringify(err))
                return res.send(err)
              });
        });
    }

    /**
     * Output console messages in non-spammer style
     * @param message
     */
    outputMessage(message) {
        if (this.lastOutputMessage !== message) {
            console.log(message)
            this.lastOutputMessage = message;
        }
    }    
}



let server = new Server(app, hostname, port);
server.checkVersion();
server.dataFeed();
server.setApi();
server.serve();