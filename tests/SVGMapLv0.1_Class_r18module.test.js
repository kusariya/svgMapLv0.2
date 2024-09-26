import {jest} from '@jest/globals';

//================================================================
// mocking 結構カオスになりそう
//================================================================
const mockMethod = jest.fn();

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
        mapCanvas:{
            style:{
                top: "",
                left: ""
            }
        },
        setMapCanvasSize: mockMethod,
        setRootViewBox: mockMethod
    })),
}));
jest.unstable_mockModule('../libs/LayerManager.js', () => ({
    LayerManager: jest.fn().mockImplementation(() => ({
        constructor: mockMethod,
        setRootLayersProps: mockMethod
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
jest.unstable_mockModule('../SVGMapLv0.1_LayerUI_r6module.js', () => ({
    SvgMapLayerUI:jest.fn().mockImplementation(()=>({
        constructor: mockMethod
    })),
}));
jest.unstable_mockModule('../libs/MapTicker.js',()=>({
    MapTicker: jest.fn().mockImplementation(()=>({ 
        constructor: mockMethod,
        showUseProperty: mockMethod,
        showPage: mockMethod,
        showPoiProperty:
            {
                showModal: mockMethod,
                setShowPoiProperty: mockMethod
            }
    })),
}));
//================================================================

describe("unittest for SVGMap Core Module", ()=>{
    describe("refer to own classes.",()=>{
        let svgmap, result, element;
        beforeEach(async () => {
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
        });

        it("setSummarizeCanvas",()=>{
            // 基本True（コード内にFalseは”だいぶ昔に消滅”と記述あり）
            svgmap.setSummarizeCanvas(true);
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

        it("setMapCanvasSize", ()=>{
            svgmap.setMapCanvasSize({x:10,y:20,width:100,height:200}); 
        });

        it("setMapCanvas", ()=>{
            let mapcanvas = new Object();
            svgmap.setMapCanvas(mapcanvas);
        });
        
        it("setMapCanvasSize", ()=>{
            svgmap.setMapCanvasSize({x:10,y:20,width:100,height:200}); 
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

        it("setRootLayersProps", ()=>{
            svgmap.setRootLayersProps(); 
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

        it("setShowPoiProperty", ()=>{
            let propFunc = function(){};
            let result = svgmap.setShowPoiProperty(propFunc, "i10"); 
        });

        it("showModal", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細はMapTickerで確認
            let result = svgmap.showModal(); 
        });

        it("showPage", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細はMapTickerで確認
            let result = svgmap.showPage(); 
        });
        
        it("showUseProperty", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細はMapTickerで確認
            let result = svgmap.showUseProperty(); 
        });
        
    });

    describe("refer to SVGMapLv0.1_LayerUI_r6module classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
        });
        it("updateLayerListUI", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細はSVGMapLv0.1_LayerUI_r6moduleで確認
            let result = svgmap.updateLayerListUI(); //なぜ起動するのか不明
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

        it("setRootViewBox",()=>{
            svgmap.setRootViewBox({x:10,y:100,width:800,height:300});
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
        // 以下の公開関数はコール先のzoompanmanagerにて確認すること
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
        // move to EssentialUIs
        it("setUpdateCenterPos", ()=>{
            result = svgmap.setUpdateCenterPos();
            expect(result).toBeUndefined();
            //expect(mockMethod).toHaveBeenCalledWith();
        });
        it("setZoomRatio", ()=>{
            expect(mockMethod).toHaveBeenCalledTimes(0);

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
