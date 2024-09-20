
import {jest} from '@jest/globals';

// ESM環境ではMock化不可　エラーメッセージ：require is not defined
//  jest.mock("../libs/MapTicker",()=>{
//      return {
//          MapTicker:jest.fn().mockImplementation(() => {
//              return {
//                  method: jest.fn().mockReturnValue("aaaa")
//              }
//          })
//      }
//  });

describe("unittest for SVGMap Core Module", ()=>{
    
    describe("target SVGMap class",()=>{
        
        let svgmap, result, element;
        beforeEach(async () => {
            //================================================================
            // mocking 結構カオスになりそう
            //================================================================
            jest.unstable_mockModule('../libs/MapTicker.js', () => ({
                MapTicker: jest.fn().mockImplementation(() => ({
                    constructor: jest.fn().mockReturnValue('Mocked Hello!'),
                })),
            }));
            jest.unstable_mockModule('../libs/MapViewerProps.js', () => ({
                MapViewerProps: jest.fn().mockImplementation(() => ({
                    constructor: jest.fn().mockReturnValue('Mocked Hello!'),
                    uaProps:{
                        verIE: 13,
                    },
                    hasUaProps: jest.fn().mockReturnValue(false),
                    setCssTransform: jest.fn().mockReturnValue()
                })),
            }));
            jest.unstable_mockModule('../libs/ZoomPanManager.js', () => ({
                ZoomPanManager: jest.fn().mockImplementation(() => ({
                    constructor: jest.fn().mockReturnValue('Mocked Hello!'),
                    zoomup:jest.fn().mockReturnValue()
                })),
            }));
            //================================================================
            const {SvgMap} = await import("../SVGMapLv0.1_Class_r18module");
            svgmap = new SvgMap();
            svgmap.initLoad();
        });

        it("zoomUp", ()=>{
            svgmap.zoomup();
        });
    });
});