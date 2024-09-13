import { SvgMapAuthoringTool } from "../SVGMapLv0.1_Authoring_r8_module";
import { mock_svgmapObj, mock_mapViewerProps } from "../resources/mockParamerters";
//import * as geom from 'jsts/org/locationtech/jts/geom.js'
import { SvgMapGIS }  from '../SVGMapLv0.1_GIS_r4_module.js';
import { jest } from "@jest/globals";

//以下のmock化の方法はV29では未実装とのこと
//https://stackoverflow.com/questions/64582674/jest-mock-of-es6-class-yields-referenceerror-require-is-not-defined
//jest.mock("../SVGMapLv0.1_GIS_r4_module");
//TODO:テストフレームワークに一部無理があるため今後切り替えを検討する必要あり

describe("unittest for SvgMapAuthoringTool",()=>{

    // ALL APIs
    // cancelPointingPoiRegister
    // clearTools
    // editPoint
    // initFreeHandTool
    // initGenericTool
    // initPOIregistTool
    // initPOItools
    // initPolygonTools
    // isEditingGraphicsElement
    // setTargetObject
    describe("target authoringtool",()=>{
        let authoringtool;
        // 引数の変数定義
        let targetDiv,poiDocId,cbFunc,cbFuncParam,getPointOnly,returnSvgElement,options;
        let title,metaData;
        let rootDocument, poiDiv, polyDiv, lineDiv, iconId, poiId;
        beforeEach(()=>{
            authoringtool = new SvgMapAuthoringTool(mock_svgmapObj, mock_mapViewerProps);
        });

        beforeAll(()=>{
            //共通パーツ
            poiDocId = "i10";
            iconId = "#green";
            rootDocument = new Document();
            targetDiv = document.createElement("div");
            targetDiv.setAttribute("id","main");
            poiDiv = document.createElement("div");
            polyDiv = document.createElement("div");
            poiDiv.setAttribute("id","poiEditor"); // ハードコーディングでごめんなさい
            polyDiv.setAttribute("id", "polyEditor");
            rootDocument.appendChild(targetDiv);
            targetDiv.appendChild(poiDiv);
            targetDiv.appendChild(polyDiv);
        });
        
        it("test for cancelPointingPoiRegister.", ()=>{
            //登録された後にキャンセルの試験しないと正常に動作しているか不明
            let cancel = authoringtool.cancelPointingPoiRegister();
        });
        
        it("test for clearTools.", ()=>{
            //#uiMapping.genericModeがどこから来るのか不明
            
        });

        it("test for editPoint",()=>{
            let point = authoringtool.editPoint();
            // 標準出力するだけの関数だった。何のためにあるんだろう？デバッグ用？
            expect(point).toBeUndefined();
        });

        it("test for initPOItools.", ()=>{
            authoringtool.initPOItools(targetDiv, poiDocId, cbFunc,cbFuncParam,getPointOnly,returnSvgElement,options);
        });

        it("test for initPOIregistTool.",()=>{
            // 何も確認できてない単体試験です
            authoringtool.initPOIregistTool(targetDiv,poiDocId,poiId,iconId,title,metaData,cbFunc,cbFuncParam,getPointOnly,returnSvgElement);
        });

        it("test for initPolygonTools",()=>{
            authoringtool.initPolygonTools(targetDiv, poiDocId);
        });
    });
})