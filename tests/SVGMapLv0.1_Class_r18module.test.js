import {jest} from '@jest/globals';

//================================================================
// mocking 結構カオスになりそう
//================================================================
jest.unstable_mockModule('../libs/MapTicker.js', () => ({
    MapTicker: jest.fn().mockImplementation(() => ({
        constructor: jest.fn().mockReturnValue('Mocked Hello!'),
    })),
}));
jest.unstable_mockModule('../libs/ZoomPanManager.js', () => ({
    ZoomPanManager: jest.fn().mockImplementation(() => ({
        constructor: jest.fn().mockReturnValue('Mocked Hello!'),
        setSmoothZoomInterval: jest.fn().mockReturnValue(),
        setSmoothZoomTransitionTime: jest.fn().mockReturnValue(),
        transform:jest.fn().mockReturnValue(),
        setZoomRatio: jest.fn().mockReturnValue(),
        zoomup:jest.fn().mockReturnValue(),
        zoomdown: jest.fn().mockReturnValue()
    })),
}));
jest.unstable_mockModule('../SVGMapLv0.1_LayerUI_r6module.js', () => ({
    SvgMapLayerUI:jest.fn().mockImplementation(()=>({
        constructor: jest.fn().mockReturnValue('Mocked Hello!')
    })),
}));
jest.unstable_mockModule('../libs/MapTicker.js',()=>({
    MapTicker: jest.fn().mockImplementation(()=>({ 
        constructor: jest.fn().mockReturnValue('Mocked Hello!'),
        showUseProperty: jest.fn().mockReturnValue(),
        showPage: jest.fn().mockReturnValue(),
        showPoiProperty:
            {
                showModal: jest.fn().mockReturnValue(),
                setShowPoiProperty: jest.fn().mockReturnValue()
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

    describe("refer to transformlib classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
        });

        it("transform", ()=>{
            svgmap.transform();
        });
    });

    describe("refer to zoompanmanager classes.",()=>{
        // 当ブロックはエラーがないこととCoverage計算の簡略化を目的に記載しています
        let svgmap, result, element;
        beforeEach(async () => {
            
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
        });
        // 以下の公開関数はコール先のzoompanmanagerにて確認すること
        it("setSmoothZoomInterval", ()=>{
            svgmap.setSmoothZoomInterval();
        });
        it("setSmoothZoomTransitionTime", ()=>{
            svgmap.setSmoothZoomTransitionTime();
        });
        it("setUpdateCenterPos", ()=>{
            svgmap.setUpdateCenterPos();
        });
        it("setZoomRatio", ()=>{
            svgmap.setZoomRatio(0);
        });
        it("zoomDown", ()=>{
            svgmap.zoomdown();
        });
        it("zoomUp", ()=>{
            svgmap.zoomup();
        });
    });
});