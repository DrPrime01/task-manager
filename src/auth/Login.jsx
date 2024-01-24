import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import { auth } from "../firebaseSetup/firebase";
import ValidatedInput from "../components/Forms/ValidatedInput";
import { AuthContext } from "../context/Auth";

export default function Login() {
	const { setToken, setUserId, setIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const methods = useForm({ mode: "all" });
	const onSubmit = async (data) => {
		try {
			const res = await signInWithEmailAndPassword(
				auth,
				data?.email,
				data?.password
			);
			setToken(res?.user?.accessToken);
			setUserId(res?.user?.uid);
			setIsLoggedIn(true);
			toast("Login successful!");
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="flex justify-center">
			<div className="md:max-w-[500px] w-full rounded-2xl p-6 border shadow-xl bg-white">
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className="flex flex-col gap-y-4"
					>
						<ValidatedInput
							name="email"
							label="Email"
							rules={{
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "invalid email address",
								},
							}}
						/>
						<ValidatedInput
							name="password"
							type="password"
							label="Enter password"
						/>
						<Button variant="contained" type="submit" fullWidth>
							Login
						</Button>
					</form>
				</FormProvider>
				<p className="font-medium text-sm text-[#444] mt-2">
					Don&apos;t have an account?{" "}
					<Link to="/signup" className="text-blue-600 font-semibold">
						Signup
					</Link>
				</p>
			</div>
		</div>
	);
}