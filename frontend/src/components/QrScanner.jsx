import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QrScanner = (props) => {
	const [data, setData] = useState("");
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			const codeReader = new BrowserMultiFormatReader();

			codeReader
				.decodeFromVideoDevice(
					null,
					videoRef.current,
					(result, error) => {
						if (result) {
							setData(result.getText());
							props.passData(result.getText());
						}
						if (error) {
							console.error(error);
						}
					}
				)
				.catch((err) => console.error("Error decoding:", err));

			// Cleanup on component unmount
			return () => {
				codeReader.reset();
			};
		}
	}, []);

	return (
		<>
			<video ref={videoRef} width="100%" />
			{data && <p>Scanned Data: {data}</p>}
		</>
	);
};

export default QrScanner;
