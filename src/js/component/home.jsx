import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {


	const [ valueList, setValueList ] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [toDo, setToDo] = useState([]);

	useEffect(() => {
		fetchData();
	}, [])

	async function fetchData() {
		const additionalSetting = {
			headers: {
				"Content-Type": "application/json"
			},
			method: "GET",
		}
		fetch(
			"https://playground.4geeks.com/apis/fake/todos/user/clsofia",
			additionalSetting)
			.then(response => {return response.json()})
			.then(data => setToDo(data))
			
			.catch((error) => console.log(error));
	}

 
	function addList(e) {
		if (e.key === 'Enter' && e.target.value !== "") {
			const addNewValue = { "label": e.target.value, "done": false };
			let newList = valueList.concat(addNewValue);
			setValueList(newList);
			methodAdd(newList);
			e.target.value = "";
		}
	}


	const methodAdd = (newList) => {
		const additionalSetting = {
			headers: {
				"Content-Type": "application/json"
			},
			method: "PUT", // or 'POST'
			body: JSON.stringify(newList)
		}
		fetch(
			"https://playground.4geeks.com/apis/fake/todos/user/clsofia",
			additionalSetting)
			.then(response => response.text())
			.then(newResponse => {
			})
			.then(response => console.log('Success:', response))
			.catch((error) => console.log(error));
	}


	function removeList(index) {
		if (index > -1) {
			const filterData = valueList.filter(item => item !== valueList[index]);
			setValueList(filterData);
			methodRemove(filterData);
		}
	}

	const methodRemove = (filterData) => {

		const additionalSetting = {
			headers: {
				"Content-Type": "application/json"
			},
			method: "DELETE",
			body: JSON.stringify(filterData)
		}
		fetch(
			"https://playground.4geeks.com/apis/fake/todos/user/clsofia",
			additionalSetting)
			.then(response => response.text())
			.then(newResponse => {
			})
			.then(response => console.log('Success:', response))
			.catch((error) => console.log(error));
	}



	return (

		<div className="container">
			<h1>My To Do List</h1>

			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={(e) => {

							if (e.key === "Enter") {

								setToDo(toDo.concat(inputValue));
								setInputValue("");
							}
						}}
						placeholder="What do you need to do?">
					</input>
				</li>
				{toDo.map((item, index) => (
					<li>
						{item.label}<i class="fas fa-times"
							onClick={() =>
								setToDo(toDo.filter(
									(t, currentIndex) =>
										index != currentIndex
								)
								)
							}></i>
					</li>
				))}

			</ul>
			<div>{toDo.length} item left</div>
		</div>

	);
};

export default Home;
