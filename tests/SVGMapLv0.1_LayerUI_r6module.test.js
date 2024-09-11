import {SvgMapLayerUI} from "../SVGMapLv0.1_LayerUI_r6module";
import {jest} from "@jest/globals";

describe("unittest for LayerUI module",()=>{
    describe("target svgMapImagesProps class",()=>{
        let svgmaplayerui;
        beforeEach(()=>{
            let svgmap_mock = jest.fn().mockImplementation()
            svgmaplayerui = new SvgMapLayerUI(svgmap_mock, false);
            console.log(svgmaplayerui);
        });
        it("test", ()=>{
            svgmaplayerui.updateLayerTable();
            
        });
    });
});