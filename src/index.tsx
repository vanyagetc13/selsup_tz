import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

type Type = "string" | "number"; // etc
type Color = string;
interface Param {
	id: number;
	name: string;
	type: Type;
}
interface ParamValue {
	paramId: number;
	value: string;
}
interface Model {
	paramValues: ParamValue[];
	colors: Color[];
}
interface Props {
	params: Param[];
	model: Model;
}

interface State {
	params: Param[];
	model: Model;
}

const params: Param[] = [
	{
		id: 1,
		name: "Назначение",
		type: "string",
	},
	{
		id: 2,
		name: "Длина",
		type: "string",
	},
];

const model: Model = {
	paramValues: [
		{
			paramId: 1,
			value: "повседневное",
		},
		{
			paramId: 2,
			value: "макси",
		},
	],
	colors: [],
};

class ParamEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			params: this.props.params,
			model: this.props.model,
		};
	}

	public getModel(): Model {
		return this.state.model;
	}

	render(): React.ReactNode {
		return (
			<div className='wrapper'>
				<div className=''>
					{this.state.params.map((param) => (
						<div className='row' key={param.id}>
							<div>{param.name}</div>
							<input
								className='input'
								type={param.type}
								value={
									this.state.model.paramValues.find(
										(e) => e.paramId === param.id
									)?.value
								}
								onChange={(e) => {
									const index: number =
										this.state.model.paramValues
											.map((e) => e.paramId)
											.indexOf(param.id);
									const newParamValue: ParamValue = {
										...this.state.model.paramValues[index],
										value: e.currentTarget.value,
									};
									const newArray: ParamValue[] =
										this.state.model.paramValues.filter(
											(e) => e.paramId !== param.id
										);
									newArray.push(newParamValue);
									this.setState({
										...this.state,
										model: {
											...this.state.model,
											paramValues: newArray,
										},
									});
								}}
							/>
						</div>
					))}
				</div>
				<button
					onClick={() => {
						console.log(this.getModel().paramValues);
					}}
				>
					getModel
				</button>
			</div>
		);
	}
}

root.render(<ParamEditor params={params} model={model} />);
