import {jest} from '@jest/globals';
import * as fs from "node:fs/promises";
import { networkInterfaces } from 'node:os';


//================================================================
// mocking 結構カオスになりそう
//================================================================
const mockMethod = jest.fn();
const mockMethodReturnTrue = jest.fn().mockReturnValue(true);
const mockMethodReturnArray = jest.fn();
const mockMethodreturnString = jest.fn();

const original_document = window.document;

const documentObject = {
    ...original_document,
    parentNode:{
        insertBefore: jest.fn(),
        getElementById: jest.fn().mockReturnThis(),
        getElementsByTagName: jest.fn().mockReturnValue([this]),
        appendChild: jest.fn(),
        removeChild: jest.fn()
    },
    dataset:{
        src: ""
    },
    getAttribute: jest.fn(),
    style:{},
    attributes:[],
    addEventListener: jest.fn(),
    setAttribute:jest.fn(),
    appendChild: jest.fn(),
    childNodes: jest.fn(),
    insertBefore: jest.fn(),
    getElementById: jest.fn().mockReturnThis(),
    getElementsByTagName: jest.fn().mockReturnValue([]),
    appendChild: jest.fn(),
    removeChild: jest.fn()
}

jest.spyOn(document, 'getElementById').mockReturnValue(documentObject);
jest.spyOn(document, 'getElementsByTagName').mockReturnValue(documentObject);
jest.spyOn(document, 'createElement').mockReturnValue(documentObject);
jest.spyOn(document.body,"appendChild").mockReturnValue();
jest.spyOn(document.documentElement, "appendChild").mockReturnValue();

//================================================================
// mocking 結構カオスになりそう
//================================================================

jest.unstable_mockModule('../libs/MapViewerProps.js', () => ({
    MapViewerProps: jest.fn().mockImplementation(() => ({
        constructor: mockMethod,
        hasUaProps: mockMethod,
        uaProps:{
            verIE: 6
        },
        mapCanvas: documentObject,
        mapCanvasSize:{
            width: 0,
            height: 0
        },
        rootViewBox:{
            width: 0,
            height: 0
        },
        root2Geo: "",
        setMapCanvasSize: mockMethod,
        setRootViewBox: mockMethod,
        hasMapCanvasSize: mockMethodReturnTrue,
    })),
}));
jest.unstable_mockModule('../libs/LayerManager.js', () => ({
    LayerManager: jest.fn().mockImplementation(() => ({
        constructor: mockMethod,
        setRootLayersProps: mockMethod,
        getRootLayersProps: mockMethod,
        setLayerVisibility: mockMethod
    })),
}));
jest.unstable_mockModule('../libs/ResourceLoadingObserver.js',()=>({
    ResourceLoadingObserver:jest.fn().mockImplementation(() => ({
        constructor:mockMethod,
        checkLoadCompleted: jest.fn(),
        init: jest.fn(),
        loadingImgs:{
            root: false
        }
    }))
}));

jest.unstable_mockModule('../SVGMapLv0.1_LayerUI_r6module.js',()=>({
    SvgMapLayerUI:jest.fn().mockImplementation(() => ({
        constructor:mockMethod,
    }))
}));
jest.unstable_mockModule('../libs/EssentialUIs.js', () => ({
    EssentialUIs: jest.fn().mockImplementation(() => ({
        constructor: mockMethod,
        setGeoCenter:mockMethod,
        setGeoViewPort: mockMethod,
        setUpdateCenterPos: mockMethod,
        setMapCanvasCSS: mockMethod,
        setGeoViewBox: jest.fn(),
        setPointerEvents: jest.fn(),
        setUpdateCenterPos:jest.fn(),
        updateCenterPos:jest.fn(),
        setCenterUI:jest.fn(),
        initNavigationUIs: jest.fn(),
        initMapCanvas: mockMethodreturnString.mockReturnValue("http://localhost/container.svg"),
    })),
}));
jest.unstable_mockModule('../libs/ZoomPanManager.js', () => ({
    ZoomPanManager: jest.fn().mockImplementation(() => ({
        setSmoothZoomInterval: mockMethod,
        setSmoothZoomTransitionTime: mockMethod,
        transform:mockMethod,
        setZoomRatio: mockMethod,
        zoomup: mockMethod,
        zoomdown: mockMethod
    })),
}));
jest.unstable_mockModule('../libs/MapTicker.js',()=>({
    MapTicker: jest.fn().mockImplementation(()=>({ 
        constructor: mockMethod,
        showUseProperty: mockMethod,
        showPage: mockMethod,
        hideTicker:jest.fn(),
        isEnabled: jest.fn().mockReturnValue(true),
        checkTicker: jest.fn(),
        pathHitTester:{
            setCentralVectorObjectsGetter: jest.fn(),
            clear: jest.fn()
        },
        poiHitTester:{
            setCentralVectorObjectsGetter: jest.fn(),
            setPoiBBox: jest.fn(),
            clear: jest.fn()
        },
        showPoiProperty:
            {
                showModal: mockMethod,
                setShowPoiProperty: mockMethod
            }
    })),
}));
//================================================================

describe("unittest for SVGMap Core Module", ()=>{
    let svgDoc="";
    beforeEach(async ()=>{

        svgDoc = await fs.readFile("./resources/svgDoc_singleSymbol.svg", "UTF-8");
    
        const xhrMock = {
            open: jest.fn(),
            send: jest.fn().mockImplementation(()=>{xhrMock.onreadystatechange();}),
            onreadystatechange: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            responseText: svgDoc
        };
        
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock);
    
    });
    afterEach(()=>{
        mockMethod.mockClear();
    });
    describe("refer to own classes.",()=>{
        let svgmap, result, element;
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
            mockMethod.mockClear();
        });
        afterEach(()=>{
            mockMethod.mockClear();
        });
        it("setSummarizeCanvas",()=>{
            // 基本True（コード内にFalseは”だいぶ昔に消滅”と記述あり）
            svgmap.setSummarizeCanvas(true);
        });
    });
    
    describe("refer to EssentialUIs classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
            mockMethod.mockClear();
        });
        afterEach(()=>{
            mockMethod.mockClear();
        });
        it("setMapCanvasCSS", ()=>{
            result = svgmap.setMapCanvasCSS({style:{}}); 
        });
        it("setUpdateCenterPos", ()=>{
            result = svgmap.setUpdateCenterPos();
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });
        it("setGeoViewPort", ()=>{
            result = svgmap.setGeoViewPort();
            expect(result).toBeFalsy();
            expect(mockMethod).toHaveBeenCalledWith();
        });
        it("setGeoCenter", ()=>{
            result = svgmap.setGeoCenter(40,140);
            expect(result).toBeFalsy();
            expect(mockMethod).toHaveBeenCalledWith();
        });
    });
    
    describe("refer to MapviewerProps classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
        });
        afterEach(()=>{
            mockMethod.mockClear();
        });
        it("setMapCanvasSize", ()=>{
            result = svgmap.setMapCanvasSize({x:10,y:20,width:100,height:200}); 
            expect(result).toBeUndefined();
        });

        it("setMapCanvas", ()=>{
            let mapcanvas = new Object();
            result = svgmap.setMapCanvas(mapcanvas);
            expect(result).toBeUndefined();
        });
        
        it("setMapCanvasSize", ()=>{
            result = svgmap.setMapCanvasSize({x:10,y:20,width:100,height:200}); 
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith({x:2,y:20,width:100,height:200});
        });
    });
    
    describe("refer to LayerManager classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
        });
        afterEach(()=>{
            mockMethod.mockClear();
        });
        it("setRootLayersProps", ()=>{
            result = svgmap.setRootLayersProps(); 
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });

        it("setRootLayersProps", ()=>{
            result = svgmap.setLayerVisibility(); 
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });
    });
    
    describe("refer to MapTicker classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
        });
        afterEach(()=>{
            mockMethod.mockClear();
        });
        it("setShowPoiProperty", ()=>{
            let propFunc = function(){};
            let result = svgmap.setShowPoiProperty(propFunc, "i10"); 
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith(propFunc, "i10");
        });

        it("showModal", ()=>{
            let result = svgmap.showModal(); 
            expect(result).toBeUndefined();
        });

        it("showPage", ()=>{
            let result = svgmap.showPage(); 
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });
        
        it("showUseProperty", ()=>{
            let result = svgmap.showUseProperty(); 
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });
        
    });

    describe("refer to SVGMapLv0.1_LayerUI_r6module classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
            mockMethod.mockClear();
        });
        afterEach(()=>{
            mockMethod.mockClear();
        });
        it("",()=>{
            console.log();
        });
    });

    describe("refer to MapviewerProps classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
            mockMethod.mockClear();
        });

        it("setRootViewBox",()=>{
            result = svgmap.setRootViewBox({x:10,y:100,width:800,height:300});
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });
    });

    describe("refer to transformlib classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
        });
        afterEach(()=>{
            mockMethod.mockClear();
        });
        it("transform", ()=>{
            result = svgmap.transform();
            expect(result).toBeInstanceOf(Object);
            expect(mockMethod).toHaveBeenCalledWith();
        });
    });

    describe("refer to zoompanmanager classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element, mock;
        afterEach(()=>{
            mockMethod.mockClear();
        });
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
            mockMethod.mockClear();
        });
        it("setSmoothZoomInterval", ()=>{
            result = svgmap.setSmoothZoomInterval();
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });
        it("setSmoothZoomTransitionTime", ()=>{
            result = svgmap.setSmoothZoomTransitionTime();
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });
        it("setZoomRatio", ()=>{
            result = svgmap.setZoomRatio(0.1);
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith(0.1);
        });
        it("zoomDown", ()=>{
            result = svgmap.zoomdown();
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });
        it("zoomUp", ()=>{
            result = svgmap.zoomup();
            expect(result).toBeUndefined();
            expect(mockMethod).toHaveBeenCalledWith();
        });
    });
});
