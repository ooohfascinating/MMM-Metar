# MMM-Metar

This is a module for the [MagicMirror²-Project](https://magicmirror.builders).

It displays METARs from airports defined in config.

## Installation

Assuming `~/MagicMirror` is the directory where you installed MagicMirror².

### Clone and install

```bash
cd ~/MagicMirror/modules
git clone https://github.com/ooohfascinating/MMM-Metar.git
```

Code was forked from [calonmerc/MMM-Metar](github.com/calonmerc/MMM-Metar) 
all props should go to them.


### Update your config.js file

Add a configuration block to the modules array in the `~/MagicMirror/config/config.js` file 

```js
var config = {
  modules: [
    {
      module: "MMM-Metar",
      position: "top_right",
      config: {
        airports: [ "KSFO","PAO","HAF","JFK" ],
      },
    },
  ],
};
```

full config
```js
{
airports: [ "KSFO","PAO","HAF","JFK" ],
      updateInterval: 10 * 60 * 1000, //every 10 minutes
      initialLoadDelay: 0, // 0 seconds delay
      listClass: "metarsList",
      alternateBackgrounds: true,
      borderBottom: true,
      warnLength: 10,
}
```
