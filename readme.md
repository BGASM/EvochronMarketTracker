# Evochron Legacy SE External Market Tracker

![Evochron Legacy SE External Market Trackermain screen](https://i3.lensdump.com/i/rvE0iZ.png?open=true)

## One time setup

1. Download *Evochron Legacy SE External Market Tracker*   
   https://github.com/BGASM/EvochronMarketTracker/releases

2. Unzip the folder to any location you find convinent.

3. Copy the savedatasettings.txt file from the folder to you Evochron install folder. It should be in the same folder as the game .exe file. If you have already done this for a different mod, then you are already set.

4. Run the game and open a save so that Evochron outputs the savedata.txt file.

5. Open the .env file in your favorite text editor and copy-paste your savedata.txt path. It needs to be surrounded in quotes, and it needs to be the literal path. For steam users this file is output to \<user>\Documents\EvochronLegacySE\\.

6. E.g. "G:\Rashwonda\Documents\EvochronLegacySE\savedata.txt"


```
SAVEDATA_FILE_PATH = "C:\FakeUser\Documents\EvochronLegacySE\savedata.txt"


# These default values should work for 99% of users who don't have other html servers running
# Application host
APP_HOST=localhost
# Application port - if busy, it will try to find a free one
APP_PORT=8080


# ------------Don't edit below this---------------
DATA_SOURCE=file

```

7. That's it, you should be good to go.

## Using the Evochron Legacy Market Tracker

1. Start the Evochron Market Tracker (`evochron_legacy_market_tracker.exe`) and if your savedata.txt is located you should see a browser window open up and load up your pilot profile and economic data for your current region.

2. To populate more trade data, fly around and visit new regions.

A console window will pop up when you start the exe. Keep this open, it is running the server and reading the savedata file.

If you want to access it from a local network, start the app the same as before, and then enter the IP address in on your other machine, e.g. `http://192.168.1.120:8080`. This second machine does not need the app or the game installed.

Application will detect and output the exact network address in console window.

## Attributions
The following code is a derivative work of the code from the X4 External App project
by mycumycu https://github.com/mycumycu/X4-External-App, which is licensed GPLv3. 
This code therefore is also licensed under the terms of the GNU Public License, verison 3.
