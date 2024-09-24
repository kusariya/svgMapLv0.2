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
                showModal: jest.fn().mockReturnValue()
            }
    })),
}));
//================================================================

describe("unittest for SVGMap Core Module", ()=>{
    
    describe("refer to other classes.",()=>{
        let svgmap, result, element;
        beforeEach(async () => {
            
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
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
        
        it("updateLayerListUI", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細はSVGMapLv0.1_LayerUI_r6moduleで確認
            let result = svgmap.updateLayerListUI(); //なぜ起動するのか不明
        });
       
        it("transform", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細は呼び出し先のtransformlib.jsで確認
            svgmap.transform();
        });
        
        it("setUpdateCenterPos", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細はコール先のzoompanmanagerにて確認すること
            svgmap.setUpdateCenterPos();
        });
        it("setZoomRatio", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細はコール先のzoompanmanagerにて確認すること
            svgmap.setZoomRatio(0);
        });
        it("zoomDown", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細はコール先のzoompanmanagerにて確認すること
            svgmap.zoomdown();
        });
        it("zoomUp", ()=>{
            // ここではエラーがないこと程度しか確認してません。
            // 詳細はコール先のzoompanmanagerにて確認すること
            svgmap.zoomup();
        });
    });
});