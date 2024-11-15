import React from "react";
import {
	Box,
	Popover,
	PopoverContent,
	PopoverTrigger,
	OrderedList,
	ListItem,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";

interface FeedbackColumnProps {
	value: string;
}

 const GaraazCustomerFeedbacksComments = ({
	value,
}: FeedbackColumnProps) => {
	const feedbackValues = value !== undefined ? value.split(";") : [];
	let displayField = "flex";
	if (feedbackValues.length <= 1) {
		displayField = "none";
	}

	return (
		<Box
			display={"flex"}
			justifyContent={"space-between"}
			alignItems={"center"}
			width={"100%"}
		>
			<span
				style={{
					paddingLeft: "2px",
					flex: 1,
					textAlign: "center",
				}}
			>
				{feedbackValues[0]}
			</span>
			<Popover>
				<PopoverTrigger>
					<div
						style={{
							display: `flex`,
							alignItems: "center",
							justifyContent: "center",
							width: "18px",
						}}
					>
						<AiFillCaretDown
							style={{
								display: `${displayField}`,
								fontSize: "18px",
								cursor: "pointer",
								color: "#718096",
								marginRight: "5px",
							}}
						/>
					</div>
				</PopoverTrigger>
				<PopoverContent style={{ padding: "10px", right: "1rem" }}>
					<OrderedList marginLeft={"20px"} textAlign={"left"}>
						{feedbackValues.map((comment: string, i: number) => (
							<ListItem key={i} padding={"5px"}>
								{comment.trim()}
							</ListItem>
						))}
					</OrderedList>
				</PopoverContent>
			</Popover>
		</Box>
	);
};

export default GaraazCustomerFeedbacksComments