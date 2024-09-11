import {SvgMapLayerUI} from "../SVGMapLv0.1_LayerUI_r6module";
import {mock_svgmapObj} from "../resources/mockParamerters"
import {jest} from "@jest/globals";

describe("unittest for LayerUI module",()=>{
    describe("target svgMapImagesProps class",()=>{
        let svgmaplayerui;
        beforeEach(()=>{
            svgmaplayerui = new SvgMapLayerUI(mock_svgmapObj, false);
            console.log(svgmaplayerui);
        });
        it("ListMessageを登録する試験？", ()=>{
            svgmaplayerui.setLayerListmessage();
        });
        it("LayerSpecificUIを自動起動", ()=>{
            svgmaplayerui.setLayerSpecificWebAppLaunchUiEnable();
        });
        it("LayerUIのカスタム設定の取得試験", ()=>{
            svgmaplayerui.getLayersCustomizer();
        });
    });
});