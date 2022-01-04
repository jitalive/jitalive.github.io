const getData = () => {
    fenrirPrice()
    jitaKills()
};

const fenrirPrice = () => {
    fetch("https://api.evemarketer.com/ec/marketstat/json?typeid=20189&regionlimit=10000002")
        .then(response => response.json())
        .then(marketStat => {
            if(marketStat && marketStat[0] && marketStat[0].sell && marketStat[0].sell.min) {
                let priceElement = document.getElementById("price");
                
                let fenrirMinPrice = marketStat[0].sell.min.toString()

                if (priceElement) {
                    priceElement.innerHTML = fenrirMinPrice[0] + "." + fenrirMinPrice.substring(1, 4)
                }
            }
        })
        .catch(error => console.error("Error:", error));
};

const jitaKills = () => {
    fetch("https://zkillboard.com/api/kills/solarSystemID/30000142/pastSeconds/3600/")
        .then(response => response.json())
        .then(zKills => {
            if(zKills) {
                let killsElement = document.getElementById("kills");
                killsElement.innerHTML = "";

                zKills.forEach(post => {
                    if(post && post.killmail_id && post.zkb && post.zkb.totalValue){
                        let totalValue = post.zkb.totalValue;

                        killsElement.insertRow();

                        let sacrificeCell = killsElement.rows[
                            killsElement.rows.length - 1
                        ].insertCell();
            
                        if(totalValue == 10000) {
                            sacrificeCell.innerHTML = "<a href='https://zkillboard.com/kill/" + post.killmail_id + "/' target='_blank' rel='noopener noreferrer'><img src='capsule.webp' title='Pwned without implants!' /></a>";
                        } else {
                            sacrificeCell.innerHTML = "<a href='https://zkillboard.com/kill/" + post.killmail_id + "/' target='_blank' rel='noopener noreferrer' title='Fantastic kill!'>" + post.zkb.totalValue + " ISK</a>";
                        }
                    }
                });
            }
        })
        .catch(error => console.error("Error:", error));
};