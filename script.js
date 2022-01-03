const getData = () => {
    fetch("https://api.evemarketer.com/ec/marketstat/json?typeid=20189&regionlimit=10000002")
        .then(response => response.json())
        .then(fenrirStat => {
            if(fenrirStat && fenrirStat[0] && fenrirStat[0].sell && fenrirStat[0].sell.min) {
                let fenrirElement = document.getElementById("fenrirPrice");
                
                let fenrirMinPrice = fenrirStat[0].sell.min.toString()

                if (fenrirElement) {
                    fenrirElement.innerHTML = fenrirMinPrice[0] + "." + fenrirMinPrice.substring(1, 4)
                }
            }
        })
        .catch(error => console.error("Error:", error));
};