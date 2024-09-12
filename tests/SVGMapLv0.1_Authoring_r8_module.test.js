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
        beforeEach(()=>{
           
            //window.jsts = {"geom":geom};
            authoringtool = new SvgMapAuthoringTool(mock_svgmapObj, mock_mapViewerProps);
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
            let aaa = document.createElement("a");
            let targetDiv,poiDocId,cbFunc,cbFuncParam,getPointOnly,returnSvgElement,options;
            let childDiv;
            poiDocId = "i10";
            targetDiv = document.createElement("div");
            childDiv = document.createElement("div");
            targetDiv.appendChild(childDiv);
        });

        it("test for initPOIregistTool.",()=>{
            let targetDocument = document.createElement("a");
            let targetDiv,poiDocId;
        });

        it("test for modinitFreeHandTool",()=>{

        });
    });
})