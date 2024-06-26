// Module to display METARs with no formatting, fetching from `https://aviationweather.gov/cgi-bin/data/metar.php/` API for consistency and international use.


Module.register("MMM-Metar", {
    // Default module config.
    defaults: {
      airports: [ "KSFO","PAO","HAF","JFK" ],
      updateInterval: 10 * 60 * 1000, //every 10 minutes
      initialLoadDelay: 0, // 0 seconds delay
      listClass: "metarsList",
      alternateBackgrounds: true,
      borderBottom: true,
      warnLength: 10,
    },

    metars: {},

    getHeader: function() {
        return this.data.header ? this.data.header : "METARs";
    },

    start () {
        //minor 'hack' to keep airports in order listed
        this.config.airports.forEach((airport) => {
            Log.info(airport);
            this.metars[airport] = '';
        });
        if(this.config.length > this.config.warnLength) {
            Log.warn(this.data.name + ": More than " + this.config.warnLength + " airports configured.");
        }
        Log.info(this.data.name + ": Fetching initial METARs");
		this.scheduleUpdate(this.config.initialLoadDelay);
    },
    
    getStyles() {
        return ["MMM-Metar.css"]
    },

    getTemplate () {
        return "listView.njk";
    },

    getTemplateData() {
        if(['top_left', 'bottom_left', 'top_right', 'bottom_right'].includes(this.data.position)) {
            positionClass = 'metarHalf';
        }
        else {
            positionClass = 'metarFull';
        }
        return {
            config: this.config,
            metars: this.metars,
            positionClass: positionClass,
        }
    },

	scheduleUpdate (delay = null) {
		let nextLoad = this.config.updateInterval;
		if (delay !== null && delay >= 0) {
			nextLoad = delay;
		}

		setTimeout(() => {
            this.update()
        }, nextLoad);
	},

    update() {
        Log.info(this.data.name + ": Fetching new METARs (" + this.config.airports.join(", ") + ")")
        this.config.airports.forEach((airport)=> {
            var updated = false;
            Log.info(this.data.name + ": Fetching " + airport)
            this.fetchData(`https://aviationweather.gov/cgi-bin/data/metar.php?ids=${airport}&format=json`)
                .then((data) => {
                    
                    if(data[0].rawOb !== this.metars[airport]) {
                        this.metars[airport] = data[0].rawOb;
                        updated = true
                    }
                    //this.updateDom(300);
                })
                .catch((request) => {
                    Log.error(this.data.name + ": unable to load:", request);
                })
                .finally(() => {
                    if(updated) {
                        this.updateDom(300);
                    }
                });
        });
        this.scheduleUpdate();
    },

    async fetchData(url) {
        return performWebRequest(url,type = "json",true);
    }
  });
