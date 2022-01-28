"use strict";

//alert("Witaj na stronie!");
require([
    "esri/Map", 
    "esri/views/MapView",
    'dijit/form/ToggleButton',
    'dijit/form/Button', 
    "esri/layers/FeatureLayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Measurement",
    "esri/widgets/Search",
    "esri/widgets/DistanceMeasurement2D"
], (Map, Mapview,ToggleButton, Button, FeatureLayer, BasemapGallery, Expand, LayerList, Legend, Measurement, Search, DistanceMeasurement2D,) => { 

    const layer = new FeatureLayer({
        portalItem: {  
            id: "91d789680a9b47b98284f6197652a0e1"
          },
          popupTemplate: {  
            title: "{Nazwa}",
            content:
            "<b>Data oddania: </b>{RokWpisu}" + 
            "<br><b>Nawierzchnia: </b>{Nawierzchn}" +
            "<br><b>Dostepnosc: </b>{Dostepnosc}" 
        }
    });
    const basemap = "hybrid";

    const map1 = new Map({
        basemap: "osm", 
        layers: [layer]     
    });

    const view = new Mapview({ 
        map: map1,
        container: "mapDiv", 
        center: [19, 52], 
        zoom: 6
    });
    const btn = new ToggleButton({
        showLabel: true,
        onClick: function(){
            map1.basemap = basemap
        }
    }, "basemapToggle").startup();

    const zoomIn = new Button({
        showLabel: true,
        onClick: function(){
            view.zoom += 1;
        }
    }, "zoomIn");

    const zoomOut = new Button({
        showLabel: true,
        onClick: function(){
            view.zoom -= 1;
        }
    }, "zoomOut");

    let warszawa = document.getElementById("Chopin");
    let krakow = document.getElementById("Kraków");
    let katowice = document.getElementById("Katowice");
    
    warszawa.addEventListener("click", function(){
        view.goTo({
            center: [20.867,52.1658],
            zoom: 12
        })
    });

    krakow.addEventListener("click", function(){
        view.goTo({
            center: [19.794,50.088],
            zoom: 12
        })
    });

    katowice.addEventListener("click", function(){
        view.goTo({
            center: [19.008,50.4741],
            zoom: 12
        })
    });

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, {position: "bottom-right"});

    const searchWidget = new Search({
        view: view,
        
    });
    view.ui.add(searchWidget,{position: "top-right"});

    const basemapGalleryWg = new BasemapGallery({
        view: view
    });

    const expWg = new Expand({
        view: view,
        content: basemapGalleryWg
    });

    view.ui.add(expWg, {position: "top-left"});

    const layerList = new LayerList({
        view:view
    });
    const exLay = new Expand({
        view: view,
        content: layerList
    });
    view.ui.add(exLay, {position: "top-right"});

    let measurement = new DistanceMeasurement2D({
        view: view
    });
    const exMe = new Expand({
        view: view,
        content: measurement
    });
    view.ui.add(exMe, {position: "top-right"})
});
