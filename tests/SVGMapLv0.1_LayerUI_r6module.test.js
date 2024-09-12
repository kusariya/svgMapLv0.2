import {SvgMapLayerUI} from "../SVGMapLv0.1_LayerUI_r6module";
import {mock_svgmapObj} from "../resources/mockParamerters"
import {jest} from "@jest/globals";

describe("unittest for LayerUI module",()=>{
    //機能単位で試験分けておきます
    describe("target LayerList",()=>{
        let svgmaplayerui, closeButton;
        beforeEach(()=>{
            svgmaplayerui = new SvgMapLayerUI(mock_svgmapObj, false);
        });
        it("LayerList上のMessageを変更する試験", ()=>{
            // UIの表示上の問題だけなので簡素な試験としてます
            svgmaplayerui.setLayerListmessage("レイヤーリスト","レイヤー表示中");
        });

        it("test init function", ()=>{
            // init関数はPrivate扱いですが、SVGMapObjectからコールされているためPublicのほうが適切では？
        });

        it("LayerUIのカスタム設定の取得試験", ()=>{
            svgmaplayerui.getLayersCustomizer();
        });
    });

    describe("target LayerSpecificUI",()=>{
        let svgmaplayerui, closeButton;
        beforeEach(()=>{
            svgmaplayerui = new SvgMapLayerUI(mock_svgmapObj, false);
            closeButton = document.createElement("input");
            closeButton.type = "button";
            closeButton.value = "x";
            jest.spyOn(document, "getElementById").mockReturnValue(closeButton);
        });
        it("LayerSpecificUI起動時のボタン群", ()=>{
            let id = "0";
            let controllerurl = "https://localhost/sample.html";
            svgmaplayerui.setLayerSpecificWebAppLaunchUiEnable(id, controllerurl);
            expect(closeButton.style.visibility).toBe("visible");
            expect(closeButton.dataset.url).toBe(controllerurl);
        });
    });
});