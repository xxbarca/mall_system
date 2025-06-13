import { Form, Input, Row, Col } from "antd";

const SearchForm = () => {
	return (
		<div>
			<Form>
				<Row gutter={24}>
					<Col span={8}>
						<Form.Item label={"分类名称"}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label={"分类名称"}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label={"分类名称"}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default SearchForm;
