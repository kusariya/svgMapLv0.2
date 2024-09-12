import {jest} from "@jest/globals";

let node = document.createElement("a");
node.setAttribute("property","none");

// 単体試験で頻繁に使用するオブジェクトをmock化してます
// TODO:以下のパラメータはSVGMapLv0.1_rXXmoduleに含まれており、いずれ外だしが必要
const mock_svgmapObj = {
    refreshScreen: jest.fn(), 
    getSvgImagesProps: jest.fn().mockReturnValue({
        "root":{"Path":{"location":{"href":"aaa"}}},
    }),
    //svgimagesはrootとi10固定にしちゃってます。
    getSvgImages: jest.fn().mockReturnValue({
        "root":{
            documentElement: node
        },
        "i10": {
            documentElement: node
        }
    }),
    getRootLayersProps: jest.fn().mockReturnValue([]),
    getGeoViewBox: jest.fn().mockReturnValue({"x":0,"y":0,"width":0,"height":0}),
    getMapCanvasSize: jest.fn().mockReturnValue({width: 1200, height: 800}),
    screen2Geo: jest.fn().mockReturnValue({lat: 130.03,lng:39.99}),
    setRootLayersProps: jest.fn(),
    getSymbols: jest.fn().mockReturnValue({})
};

const mock_mapViewerProps = {
    mapCanvasSize:{
        width: 800,
        height: 600
    },
    rootViewBox:{
        width: 800,
        height: 600,
        x:500,
        y:450
    },
    rootCrs:{
        x:1,
        y:1
    },
    uaProps:{
        verIE:11
    },
    mapCanvas: document.createElement("canvas"),    //これであっているか不明
    setRootViewBox:jest.fn(),
};


export { mock_svgmapObj, mock_mapViewerProps };