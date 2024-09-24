
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
        zoomup:jest.fn().mockReturnValue(),
        zoomdown: jest.fn().mockReturnValue()
    })),
}));
//================================================================

describe("unittest for SVGMap Core Module", ()=>{
    
    describe("target SVGMap class",()=>{
        
        let svgmap, result, element;
        beforeEach(async () => {
            
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
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