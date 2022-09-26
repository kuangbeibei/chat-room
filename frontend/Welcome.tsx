import React, { useRef, SyntheticEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { postUser, UserResponse } from "./request/api";

export default function Welcome() {
	const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

	const handleSubmit = async (e: SyntheticEvent<HTMLInputElement>) => {
		if (!inputRef.current!.value) return;
		e.preventDefault();
		const inputVal = inputRef.current!.value;
        const {sign} = await postUser(inputVal) as UserResponse;
        window.localStorage.setItem('accessToken', sign);
        navigate("/");
	};

	const handleBlur = (e: SyntheticEvent<HTMLInputElement>) => {
		handleSubmit(e);
	};

	// 要做debounce处理
	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode !== 13) return;
		handleSubmit(e);
	};
	
	return (
		<div className="absolute left-[50%] top-[30%] translate-x-[-50%]">
			<h1 className="text-3xl text-center text-white font-bold animate-[dropIn_2s_ease-in-out]">
				Welcome to Chat Room! <br />
			</h1>
			<h2 className="mt-5 text-xl text-center text-white font-normal animate-[dropIn_1s_ease-in-out]">
				Please sign in with your name
			</h2>
			<div>
				<input
					ref={inputRef}
					onKeyUp={handleKeyUp}
					onBlur={handleBlur}
					type="text"
					autoFocus={true}
					className="mt-10 appearance-none w-full outline-none px-4 py-2 rounded-md bg-gray-100 text-gray-700 focus:ring-1 focus:ring-gray-200 animate-[show_2s_ease-in-out]"
				/>
			</div>
		</div>
	);
}
