/* eslint-disable react/prop-types */
import { Fade, Slide } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function Modal({
	children,
	openModal,
	closeModal,
	maxWidth = 500,
	title,
}) {
	return (
		<Fade in={openModal}>
			<div
				onClick={(e) => e.target === e.currentTarget && closeModal()}
				className="fixed h-full w-full top-0 left-0 overflow-hidden z-[999] flex items-center justify-center"
				style={{
					background: "rgba(0, 0, 0, 0.5)",
					backdropFilter: "blur(5px)",
				}}
			>
				<Slide direction="up" in={openModal} mountOnEnter unmountOnExit>
					<div
						style={{ maxWidth }}
						className="relative min-h-[548px] max-h-[85vh] overflow-y-auto flex flex-col md:min-w-[697px] w-[95vw] m-auto md:pt-16 md:px-24 p-4 sm:p-5 rounded-[10px] bg-white"
					>
						<div>
							<p className="text-black text-xl font-semibold mb-10">{title}</p>

							<button
								className="absolute top-11 right-10 bg-[#7272721F] rounded-full w-max"
								onClick={closeModal}
							>
								<ClearIcon />
							</button>
						</div>
						{children}
					</div>
				</Slide>
			</div>
		</Fade>
	);
}
