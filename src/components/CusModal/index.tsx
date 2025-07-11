import { Modal } from "antd";
import React from "react";

interface Props {
	open: boolean;
	title: string;
	width?: string;
	children?: React.ReactNode;
	onCancel: () => void;
	onOK: () => void;
}
const CusModal = ({ open, title, width = "60%", children, onCancel, onOK }: Props) => {
	return (
		<Modal open={open} title={title} width={width} onCancel={onCancel} onOk={onOK}>
			{children}
		</Modal>
	);
};

export default CusModal;
