import { ZoomPanManager } from "../../libs/ZoomPanManager";
import { expect, jest } from "@jest/globals";
import { mock_svgmapObj } from "./resources/mockParamerters";
import * as fs from "node:fs/promises";
import { beforeEach } from "node:test";

const basePath = "./tests/unittest/resources/zoompanmanager/";
const devices = [
	// {
	// 	// SmartPhone
	// 	device: "smartPhone",
	// 	smartPhone: true,
	// 	clickEvent: {
	// 		eventFile: "touchEventForSmartPhone.json",
	// 		correct: { x: 300, y: 500 },
	// 	},
	// 	dragEvent: {
	// 		eventFile: "touchEventForSmartPhone.json",
	// 		correct: { x: 48, y: 648 },
	// 	},
	// 	scrollEvent: {
	// 		eventFile: "touchEventForSmartPhone.json", //pinch out
	// 		correct: false,
	// 	},
	// },
	{
		// PC
		device: "PC",
		smartPhone: false,
		clickEvent: {
			eventFile: "clickEventForPC.json",
			correct: { x: 48, y: 648 },
		},
		dragEvent: {
			eventFile: "dragEventForPC.json",
			correct: { x: 48, y: 648 },
		},
		scrollEvent: {
			eventFile: "scrollEventForPC.json", //wheel down
			correct: false,
		},
	},
];

describe("unittest for ZoomPanManager", () => {
	describe.each(devices)("returns $device", (device) => {
		let zoompanmanager, dummy_eventData;
		let mock_hideTickerFunc,
			mock_checkLoadCompletedFunc,
			mock_getObjectAtPointFunc,
			mock_getIntValueFunc,
			mock_getRootSvg2CanvasFunc,
			mock_mapViewerProps;
		beforeAll(() => {
			mock_hideTickerFunc = jest.fn();
			mock_checkLoadCompletedFunc = jest.fn();
			mock_getObjectAtPointFunc = jest.fn();
			mock_getIntValueFunc = jest.fn();
			mock_getRootSvg2CanvasFunc = jest.fn();
			mock_mapViewerProps = { uaProps: { isIE: false } }; // IEは対象外とするため固定です

			zoompanmanager = new ZoomPanManager(
				mock_hideTickerFunc,
				mock_checkLoadCompletedFunc,
				mock_getObjectAtPointFunc,
				mock_getIntValueFunc,
				mock_getRootSvg2CanvasFunc,
				mock_mapViewerProps,
				mock_svgmapObj
			);
		});
		beforeEach(() => {
			jest.reestAllMocks();
		});

		it("マウス座標の取得", async () => {
			const json = await fs.readFile(
				basePath + device.clickEvent.eventFile,
				"UTF-8"
			);
			const dummy_eventData = JSON.parse(json, "text/xml");
			let result = zoompanmanager.getMouseXY(dummy_eventData);
			expect(result).toEqual(device.clickEvent.correct);
		});

		it("クリックの挙動", async () => {
			const json = await fs.readFile(
				basePath + device.clickEvent.eventFile,
				"UTF-8"
			);
			const dummy_eventData = JSON.parse(json);
			let result = zoompanmanager.startPan(dummy_eventData);
			expect(result).toEqual(false);
			result = zoompanmanager.showPanning(dummy_eventData);
			expect(mock_getObjectAtPointFunc).toHaveBeenCalledWith(
				device.clickEvent.correct.x,
				device.clickEvent.correct.y
			);
		});

		it("左クリックでのPAN", async () => {
			const click = await fs.readFile(
				basePath + device.clickEvent.eventFile,
				"UTF-8"
			);
			const clickEventData = JSON.parse(click);
			const drag = await fs.readFile(
				basePath + device.dragEvent.eventFile,
				"UTF-8"
			);
			const dragEventData = JSON.parse(drag);
			let result = zoompanmanager.startPan(clickEventData);
			expect(result).toBe(false);
			result = zoompanmanager.showPanning(dragEventData);
			expect(result).toBe(false);
			expect(mock_getObjectAtPointFunc).toHaveBeenCalledWith(
				device.clickEvent.correct.x,
				device.clickEvent.correct.y
			);
		});
		// it("StartZoom-EndZoom. 右クリックでのZoom", async () => {
		// 	const json = await fs.readFile(
		// 		basePath + device.clickEvent.eventFile,
		// 		"UTF-8"
		// 	);
		// 	const dummy_eventData = JSON.parse(json);
		// 	zoompanmanager.startPan(dummy_eventData);
		// 	zoompanmanager.showPanning(dummy_eventData);
		// 	zoompanmanager.endPan();
		// 	//expect(zoompanmanager.#panning).toBe(false);
		// });
		// it("StartZoom-EndZoom. ホイールでのZoom", async () => {
		// 	const json = await fs.readFile(
		// 		basePath + device.clickEvent.eventFile,
		// 		"UTF-8"
		// 	);
		// 	const dummy_eventData = JSON.parse(json);
		// 	zoompanmanager.startPan(dummy_eventData);
		// 	zoompanmanager.showPanning(dummy_eventData);
		// 	zoompanmanager.endPan();
		// 	//expect(zoompanmanager.#panning).toBe(false);
		// });
	});
});
