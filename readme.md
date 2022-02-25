# Evochron Legacy SE External Market Tracker

## Attributions
The following code is a derivative work of the code from the X4 External App project
by mycumycu https://github.com/mycumycu/X4-External-App, which is licensed GPLv3. 
This code therefore is also licensed under the terms  of the GNU Public License, verison 3.


## Making sever executable from source

In order to build executable of X4 External App server yourself:

1. Clone this repo with the command:  
   `git clone https://github.com/mycumycu/X4-External-App.git`
2. Change dir:  
   `cd x4_external_app`
3. Install packages:  
   `npm install`
4. Create *.env.* file from existing *.env.example* file  
   `copy .env.example .env`
5. Build exe with:  
   `npm run package`

Output executable will be created in `\dist` folder

