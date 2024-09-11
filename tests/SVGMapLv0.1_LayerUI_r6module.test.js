import {SvgMapLayerUI} from "../SVGMapLv0.1_LayerUI_r6module";
import {mock_svgmapObj} from "../resources/mockParamerters"
import {jest} from "@jest/globals";

describe("unittest for LayerUI module",()=>{
    describe("target svgMapImagesProps class",()=>{
        let svgmaplayerui, closeButton;
        beforeEach(()=>{
            svgmaplayerui = new SvgMapLayerUI(mock_svgmapObj, false);
            console.log(svgmaplayerui);
            closeButton = document.createElement("input");
            closeButton.type = "button";
            closeButton.value = "x";
            jest.spyOn(document, "getElementById").mockReturnValue(closeButton);
        });
        it("ListMessageを登録する試験？", ()=>{
            svgmaplayerui.setLayerListmessage();
        });
        it("LayerSpecificUIを自動起動", ()=>{
            let id = "0";
            let controllerurl = "https://localhost/sample.html";
            svgmaplayerui.setLayerSpecificWebAppLaunchUiEnable(id, controllerurl);
            expect(closeButton.style.visibility).toBe("visible");
            expect(closeButton.dataset.url).toBe(controllerurl);
        });
        it("LayerUIのカスタム設定の取得試験", ()=>{
            svgmaplayerui.getLayersCustomizer();
        });
    });
});