"use client";

import * as React from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function Blog_idPage() {
	const router = useRouter();
	const { blog_id } = useParams()
	const editorRef = useRef(null);
	const [date, setDate] = useState(0);
	const [blogId, setBlogId] = useState(null);
	const [title, setTitle] = useState("");
	const [metaDescription, setMetaDescription] = useState("");
	const [author, setAuthor] = useState("");
	const [category, setCategory] = useState("");

	const fetchBlogData = async (id) => {

		try {
			const response = await fetch(`/api/admin/blog/blog_data?id=${id}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();

			if (data.success) {
				const blogs = data.blogs[0]
				setTitle(blogs.title);
				setMetaDescription(blogs.metaDescription ? blogs.metaDescription : null);
				setDate(blogs.date ? new Date(blogs.date) : 0);
				setAuthor(blogs.author ? blogs.author : null);
				setCategory(blogs.category ? blogs.category : null);
			}
			else {
				router.push("/admin/blog")
			}

		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSubmit = async () => {

		const savedData = await editorRef.current.save();

		const data = {
			title,
			metaDescription,
			body: savedData,
			date,
			author,
			category,
			blogId,
		};

		try {
			const response = await fetch("/api/admin/blog/updateBlog", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			console.log("Success:", result);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		fetchBlogData(blog_id)
		setBlogId(blog_id)
	}, [blog_id])

	useEffect(() => {
		if (typeof window !== "undefined" && !editorRef.current) {
			import("@editorjs/editorjs").then(({ default: EditorJS }) => {
				import("@editorjs/header").then(({ default: Header }) => {
					import("@editorjs/list").then(({ default: List }) => {
						import("@editorjs/image").then(({ default: ImageTool }) => {
							import("@editorjs/embed").then(({ default: Embed }) => {
								import("@editorjs/quote").then(({ default: Quote }) => {
									import("@editorjs/marker").then(({ default: Marker }) => {
										import("@editorjs/code").then(({ default: CodeTool }) => {
											import("@editorjs/delimiter").then(
												({ default: Delimiter }) => {
													import("@editorjs/inline-code").then(
														({ default: InlineCode }) => {
															import("@editorjs/link").then(
																({ default: LinkTool }) => {
																	import("@editorjs/table").then(
																		({ default: Table }) => {
																			import("@editorjs/paragraph").then(
																				({ default: Paragraph }) => {
																					import("@editorjs/checklist").then(
																						({ default: Checklist }) => {
																							import("@editorjs/warning").then(
																								({ default: Warning }) => {
																									import("@editorjs/raw").then(
																										({ default: RawTool }) => {
																											editorRef.current = new EditorJS({
																												holder: "editorjs",
																												tools: {
																													header: {
																														class: Header,
																														inlineToolbar: true,
																													},
																													list: {
																														class: List,
																														inlineToolbar: true,
																														config: {
																															defaultStyle:
																																"unordered",
																														},
																													},
																													image: {
																														class: ImageTool,
																														config: {

																															uploader: {

																																uploadByFile: async (file) => {
																																	const formData = new FormData();
																																	formData.append("image", file);

																																	try {
																																		const response = await fetch("/api/admin/blog/uploadImage", {
																																			method: "POST",
																																			body: formData,
																																		});

																																		const data = await response.json();

																																		if (data.success) {
																																			return {
																																				success: 1,
																																				file: {
																																					url: data.url,
																																				},
																																			};
																																		} else {
																																			return {
																																				success: 0,
																																				error: "File upload failed",
																																			};
																																		}
																																	} catch (error) {
																																		return {
																																			success: 0,
																																			error: "An error occurred during the upload",
																																		};
																																	}
																																}


																															}
																														},
																													},
																													embed: {
																														class: Embed,
																														config: {
																															services: {
																																youtube: true,
																																coub: true,
																															},
																														},
																													},
																													quote: Quote,
																													marker: Marker,
																													code: CodeTool,
																													delimiter: Delimiter,
																													inlineCode: InlineCode,
																													linkTool: LinkTool,
																													table: Table,
																													paragraph: {
																														class: Paragraph,
																														inlineToolbar: true,
																													},
																													warning: {
																														class: Warning,
																														inlineToolbar: true,
																														config: {
																															titlePlaceholder: "Title",
																															messagePlaceholder: "Message",
																														},
																													},
																													raw: RawTool,
																												},
																											});
																										}
																									);
																								}
																							);
																						}
																					);
																				}
																			);
																		}
																	);
																}
															);
														}
													);
												}
											);
										});
									});
								});
							});
						});
					});
				});
			});
		}

		return () => {
			if (editorRef.current) {
				editorRef.current.destroy();
				editorRef.current = null;
			}
		};
	}, []);

	return (
		<>
			<div className="md:flex justify-between flex-row-reverse gap-2">
				<div className="rounded-2xl border border-gray-200 flex-auto bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
					<h1 className="text-4xl font-semibold mb-5 text-gray-800 dark:text-white/90">
						{title}
					</h1>
					<div id="editorjs" className="px-4"></div>
				</div>

				<div className="w-80">
					<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
						<h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white/90">
							Settings
						</h3>
						<div className="pt-3">
							<div className="mb-3">
								<Input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Title"
								/>
							</div>

							<div className="mb-3">
								<Textarea
									className={`resize-none h-32`}
									value={metaDescription}
									onChange={(e) => setMetaDescription(e.target.value)}
									placeholder="Meta Description"
								/>
							</div>

							<div className="mb-3">
								<Select onValueChange={setAuthor}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Author" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="apple">Apple</SelectItem>
											<SelectItem value="banana">Banana</SelectItem>
											<SelectItem value="blueberry">Blueberry</SelectItem>
											<SelectItem value="grapes">Grapes</SelectItem>
											<SelectItem value="pineapple">Pineapple</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="mb-3">
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className={cn(
												"w-full justify-start text-left font-normal",
												!date && "text-muted-foreground"
											)}
										>
											<CalendarIcon />
											{date ? format(date, "PPP") : <span>Date Published</span>}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={date}
											onSelect={setDate}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className="mb-3">
								<Select onValueChange={setCategory}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Category" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="AI & Marketing Automation">AI & Marketing Automation</SelectItem>
											<SelectItem value="Digital Marketing Strategies">Digital Marketing Strategies</SelectItem>
											<SelectItem value="Case Studies">Case Studies</SelectItem>
											<SelectItem value="Tools & Technology">Tools & Technology</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<Button
								className="mt-4 mx-auto block w-full max-w-44 cursor-pointer bg-green-700 hover:bg-green-400"
								onClick={handleSubmit}
							>
								Upload
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
