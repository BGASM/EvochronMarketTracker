const fs = require('fs');
const path = require('path');
const express = require('express');
const portfinder = require("portfinder");
const { Sequelize } = require('@sequelize/core');
const chalk = require('chalk');
const sorter = require('sorter');
const db = require(path.join(__dirname, '/models'));
const chokidar = require('chokidar')
const dotenvAbsolutePath = process.cwd() + '/.env';
require('dotenv').config({ path: dotenvAbsolutePath });
const hostname = process.env.APP_HOST || '127.0.0.1';
const port = process.env.APP_PORT || 8080;
let app = express();


//const savedatacategory = "pilot_name|fuel|cash|cargo_bay_1|cargo_bay_2|cargo_bay_3|cargo_bay_4|cargo_bay_5|cargo_bay_6|cargo_bay_7|cargo_bay_8|cargo_bay_9|cargo_bay_10|player_position_X|player_position_Y|player_position_Z|player_position_SX|player_position_SY|player_position_SZ|local_planet_name|energy_level|front_shield_level|right_shield_level|left_shield_level|rear_shield_level|hull_damage_level|engine_damage|weapon_damage|nav_damage|target_description|target_threat_level|target_range|target_front_shield_level|target_right_shield_level|target_left_shield_level|target_rear_shield_level|target_engine_damage|target_weapon_damage|target_nav_damage|capital_ship_weapon_turret_1|capital_ship_weapon_turret_2|capital_ship_weapon_turret_3|capital_ship_weapon_turret_4|target_cargo_bay_1|target_cargo_bay_2|target_cargo_bay_3|target_cargo_bay_4|target_cargo_bay_5|target_cargo_bay_6|target_cargo_bay_7|target_cargo_bay_8|target_cargo_bay_9|target_cargo_bay_10|inbound_missile_alert|particle_cannon|beam_cannon|secondary_weapon_slot_1|secondary_weapon_slot_2|secondary_weapon_slot_3|secondary_weapon_slot_4|secondary_weapon_slot_5|secondary_weapon_slot_6|secondary_weapon_slot_7|secondary_weapon_slot_8|equipment_slot_1|equipment_slot_2|equipment_slot_3|equipment_slot_4|equipment_slot_5|equipment_slot_6|equipment_slot_7|equipment_slot_8|equipment_slot_9|equipment_slot_10|ship_type|engine_class|shield_class|cargo_capacity|wing_and_thruster_class|crew_limit|equipment_limit|countermeasure_limit|hardpoint_limit|armor_limit|total_kills|total_contracts|skill_and_proficiency_rating|military_rank|particle_cannon_range|armed_missile_range|targeted_subsystem|target_faction|target_damage_level|target_velocity|engine/thruster_heat_indicator|MDTS_status|missile_lock_status|countermeasures_remaining|energy_bias_setting|in-sector_waypoint_X_coordinate|in-sector_waypoint_Y_coordinate|in-sector_waypoint_Z_coordinate|sector_waypoint_SX_coordinate|sector_waypoint_SY_coordinate|sector_waypoint_SZ_coordinate|navigation_waypoint_distance|IDS_status|IDS_multiplier|afterburner_status|autopilot_status|navigation_console_status|build_console_status|inventory_console_status|trade_console_status|tractor_beam_status|HUD_status|target_display_status|total_hostiles_in_radar_range|player_ship_velocity|player_ship_set_velocity|player_ship_altitude|gravity_level|heat_signature_level|player_ship_total_velocity,_AVL|player_ship_heading|target_engine_class_or_object_contents_1|target_resistor_packs_or_object_contents_2|target_hull_plating_or_object_contents_3|target_module_type_or_object_contents_4|target_wing_class_or_object_contents_5|player_ship_pitch|vertical_velocity_level|horizontal_velocity_level|pitch_control_input_level|yaw_control_input_level|roll_control_input_level|horizontal_strafe_control_input_level|vertical_strafe_control_input_level|forward_vertical_thruster_output_level|forward_horizontal_thruster_output_level|rear_vertical_thruster_output_level|rear_horizontal_thruster_output_level|engine_output_level|current_contract_type|current_contract_pay_amount|general_docking_status|carrier_docking_status|nebula_cloud|asteroid_field|planetary_atmosphere|primary_weapon_mode|faction_affiliation|low_light_vision_mode|text_entry_status|station_in_sector|carrier_in_sector|jump_gate_in_sector|planet_in_sector|gase_planet_in_sector|moon_in_sector|star_in_sector|asteroid_field_in_sector|cave_in_sector|nebula_cloud_in_sector|wormhole_in_sector|blackhole_in_sector|comet_in_sector|nav_destination_sector_distance|regional_economy_level|regional_territory_control|station_attack_status|region_index_value|food_price|medical_supplies_price|hydrogen_price|electronics_price|solar_price|metal_price|diamond_price|antimatter_price|fusion_price|machinery_price|textiles_price|platinum_price|biological_price|oxygen_price|gold_price|silver_price|water_price|armor_price|jump_drive_status|jump_drive_delay_time"
//var category = savedatacategory.split('|');
var category = fs.readFileSync(path.join(__dirname, "/static/savedatacategory.txt"), "utf-8").split('\n');



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

    readFromFile() {
        this.outputMessage(`${chalk.yellowBright('Development mode')} - looking for savedata in ` + process.env.DEV_FILE_PATH);
        
        chokidar.watch(process.env.DEV_FILE_PATH).on('all', (event, path) => {
            fs.readFile(process.env.DEV_FILE_PATH, 'utf8', (err, d) => {
                if (err) {
                    this.outputMessage(`${chalk.yellowBright('Development mode')} - encountered an error: ` + err)
                    return
                }

                var data = this.parseTextFile(d).replace(/\\r/g, '')                
                this.dataObject = sorter.sorted(JSON.parse(data));
                this.updateEconDB();                                
                this.outputMessage(`${chalk.yellowBright('Development mode')} - reading data from file successful`);
            });
        })
    }    

    parseTextFile(data) {        
        data = data.split('\n')
        var result =  data.reduce(function(result, field, index) {
            result[category[index]] = field;
            return result;
          }, {})        
        return JSON.stringify(result);
    }
    
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

    outputMessage(message) {
        if (this.lastOutputMessage !== message) {
            console.log(message)
            this.lastOutputMessage = message;
        }
    }

    async updateEconDB() {    
        var d = this.dataObject.econ;
        this.outputMessage(`${chalk.yellowBright('Development mode')} - looking for database`);
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
    
    async syncDB() {
        await db.sequelize.sync({ force: true });
        this.outputMessage(`${chalk.yellowBright('Development mode')} - All models were synchronized successfully.`);
    }

    async init() {
        await this.syncDB()
        this.readFromFile()
        this.setApi()
        this.serve()
    }
}
    




let server = new Server(app, hostname, port);
server.checkVersion();
server.init();