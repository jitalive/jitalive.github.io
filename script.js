const getData = () => {
    kills();
    price();
};

const kills = () => {
    fetch("https://zkillboard.com/api/kills/solarSystemID/30000142/pastSeconds/3600/")
        .then(response => response.json())
        .then(kills => {
            if (kills) {
                let element = document.getElementById("kills");
                element.innerHTML = "";

                kills.forEach(post => {
                    if (post && post.killmail_id && post.zkb && post.zkb.totalValue) {
                        let totalValue = post.zkb.totalValue;

                        element.insertRow();

                        let cell = element.rows[
                            element.rows.length - 1
                        ].insertCell();

                        if (totalValue == 10000) {
                            cell.innerHTML = "<a href='https://zkillboard.com/kill/" + post.killmail_id + "/' target='_blank' rel='noopener noreferrer'><img src='capsule.webp' title='Pwned! (But without implants)' /></a>";
                        } else {
                            cell.innerHTML = "<a href='https://zkillboard.com/kill/" + post.killmail_id + "/' target='_blank' rel='noopener noreferrer' title='Fantastic kill!'>" + totalValue + " ISK</a>";
                        }
                    }
                });
            }
        })
        .catch(error => console.error("Error:", error));
};

const price = () => {
    fetch("https://api.evemarketer.com/ec/marketstat/json?typeid=20189&regionlimit=10000002")
        .then(response => response.json())
        .then(fenrir => {
            if (fenrir && fenrir[0] && fenrir[0].sell && fenrir[0].sell.min) {
                let element = document.getElementById("price");

                let price = fenrir[0].sell.min.toString();

                if (element && price.length > 3) {
                    element.textContent = price[0] + "." + price.substring(1, 4);
                }
            }
        })
        .catch(error => console.error("Error:", error));
};
