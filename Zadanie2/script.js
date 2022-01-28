require([
    "esri/Map", 
    "esri/views/SceneView", 
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/Legend"
], (Map, Sceneview, FeatureLayer, Graphic, GraphicsLayer, BasemapGallery, Expand,Legend) => { 

    const fl1 = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
    });

    const fl2 = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0",
        
    });

    let gl = new GraphicsLayer();

    const map1 = new Map({ 
        basemap: "national-geographic", 
        layers: [fl2, gl]    
    });

    const view = new Sceneview({ 
        map: map1,
        container: "mapDiv", 
        center: [-96, 38], 
        zoom: 3
    });
    let query = fl1.createQuery();
    query.where = "MAGNITUDE > 4";
    query.outFields = ["*"];
    query.returnGeometry = true;

    fl1.queryFeatures(query)
    .then(response => {
        getResults(response.features)
    })


    const basemapGalleryWg = new BasemapGallery({
        view: view
    });

    const expWg = new Expand({
        view: view,
        content: basemapGalleryWg
    });
    view.ui.add(expWg, {position: "top-right"});

    const legend = new Legend({
        view: view
    });
    const expLeg = new Expand({
        view: view,
        content: legend
    });

    view.ui.add(expLeg, {position: "top-right"});
    const getResults = (features) => {
        const symbol = {
            type: "simple-marker",
            color: "red",
            size: 10
        };

        features.map(elem => {
            elem.symbol = symbol
        });

        gl.addMany(features);
    }
    const simpleRenderer = {
        type: "simple",
        symbol: {
            type: "point-3d",
            symbolLayers: [
                {
                    type: "object",
                    resource: {
                        primitive: "cylinder"
                    },
                    width: 5000
                }
            ]
        },
        visualVariables:  [
            {
                type: "color",
                field: "MAGNITUDE",
                stops: [
                    {
                        value: 0.5,
                        color: "green"
                    },
                    {
                        value: 1.5,
                        color: "yellow"
                    },
                    {
                        value: 4.48,
                        color: "red"
                    }
                ]
            },
            {
                type: "size",
                field: "DEPTH",
                stops: [{
                    value: -3.39,
                    size: 50000
                },
                {
                    value: 30.97,
                    size: 100000
                }
                ]
            }
        ]
    };
    fl2.renderer = simpleRenderer;


});


    