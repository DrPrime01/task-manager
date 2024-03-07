import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
// import axios from "axios";

import { auth } from "../firebaseSetup/firebase";
import ValidatedInput from "../components/Forms/ValidatedInput";
import { AuthContext } from "../context/Auth";

export default function Login() {
	const { setToken, setUserId, setIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const methods = useForm({ mode: "all" });

	// const sendPushNotification = async () => {
	// 	try {
	// 		await axios.post(
	// 			"https://08481db0-f3d7-4f91-a1c6-547956916586.pushnotifications.pusher.com/publish_api/v1/instances/08481db0-f3d7-4f91-a1c6-547956916586/publishes",
	// 			{
	// 				interests: ["hello"],
	// 				web: {
	// 					notification: {
	// 						title: "Hello",
	// 						body: "Hello, world!",
	// 					},
	// 				},
	// 			},
	// 			{
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization:
	// 						`Bearer ${import.meta.env.VITE_PUSHER_BEARER_TOKEN}`,
	// 				},
	// 			}
	// 		);
	// 		console.log("Push notification sent successfully");
	// 	} catch (error) {
	// 		console.error("Error sending push notification:", error);
	// 	}
	// };

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
			console.log(res);
			// await sendPushNotification();
			navigate("/");
		} catch (err) {
			if (err.code === "auth/invalid-credential") {
				toast.error("Invalid Credentials!");
			}
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
