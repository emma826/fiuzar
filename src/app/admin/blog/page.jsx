'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link";

import { Alert, AlertDescription } from "@/components/ui/alert"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";

// export const metadata = {
// 	title: "Blog | Fiuzar Admin",
// };

export default function BlogPage() {
	const router = useRouter()
	const [image, setImage] = useState(null);
	const [imageFile, setFile] = useState(null)
	const [title, setTitle] = useState("");
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [isErrorVisible, setIsErrorVisible] = useState(false);
	const [isSuccessVisible, setIsSuccessVisible] = useState(false);
	const [blogs, setBlogs] = useState([])
	const [newBlogId, setNewBlogId] = useState("")

	useEffect(() => {
		get_blogs()
	}, [newBlogId])

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(URL.createObjectURL(file));
			setFile(file)
		}
		else {
			setImage(null)
		}
	};

	const get_blogs = async () => {
		const response = await fetch("/api/admin/blog")
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const blog = await response.json();
		if (blog) {
			setBlogs(blog.blogs)
		}
	}

	const handleSubmit = async () => {

		setErrorMessage("")
		setSuccessMessage("")
		setIsErrorVisible(false)
		setIsSuccessVisible(false)

		const formData = new FormData();
		formData.append("title", title);
		formData.append("image", imageFile);

		await fetch("/api/admin/blog", {
			method: "POST",
			body: formData,
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					setNewBlogId(data.blogId)
					setSuccessMessage("Blog created successfully, redirecting ...")
					setIsSuccessVisible(true)
					router.push(`/admin/blog/${data.blogId}`)

					setTimeout(() => {
						setIsSuccessVisible(false);
					}, 5000);
				}
				else {
					setErrorMessage(data.message)
					setIsErrorVisible(true)

					setTimeout(() => {
						setIsErrorVisible(false);
					}, 5000);
				}
			})
			.catch(err => console.error(err))

	};

	return (
		<div>

			<h3 className="text-3xl font-semibold mb-2 text-primary">
				Blog Posts
			</h3>

			<div className="py-5 px-3 flex justify-between">
				<div className="flex-auto">
					<div className="rounded-sm border w-80 border-gray-200 bg-white flex justify-between dark:border-gray-800 overflow-hidden dark:bg-white/[0.03]">
						<Input type="text" style={{ outline: "none", border: "none" }} placeholder="Search..." className="border-none flex-auto rounded-none focus:ring-0" />
						<SearchIcon className="block w-10 mt-1.5 cursor-pointer align-middle text-gray-500" />
					</div>
				</div>
				<div>
					<Dialog>
						<DialogTrigger className="bg-green-800 cursor-pointer rounded-md py-3 px-7 -mt-2.5">New Blog</DialogTrigger>
						<DialogContent className="sm:max-w-[500px]">
							<DialogHeader>
								<DialogTitle className="text-3xl border-b-gray-800 dark:border-b-gray-200 border-b-1 pb-4">Create Blog</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 pb-4 pt-2 max-h-[400px]">

								{isSuccessVisible && (
									<Alert className="border border-green-700">
										<AlertDescription className="text-green-500">{successMessage}</AlertDescription>
									</Alert>
								)}
								{isErrorVisible && (
									<Alert variant="destructive">
										<AlertDescription>{errorMessage}</AlertDescription>
									</Alert>
								)}

								<div className="mb-2">
									<Input className="py-5" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
								</div>

								<div className="rounded-2xl border border-gray-200 bg-white overflow-hidden dark:border-gray-800 dark:bg-white/[0.03]">
									<div className="relative upload_icon_holder">
										<Input type="file" className="absolute h-[500px] opacity-0" onChange={handleImageChange} />
										{image ? (
											<img src={image} alt="Uploaded" className="w-full h-full object-cover" />
										) : (
											<div className="flex justify-center items-center py-10 space-x-2">
												<UploadIcon className="w-6 h-6" />
												<span className="text-gray-500">Upload Image</span>
											</div>
										)}
									</div>
								</div>

							</div>
							<DialogFooter>
								<Button className="bg-green-800 hover:bg-green-300 cursor-pointer" onClick={handleSubmit}>Submit</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

				</div>
			</div>

			<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
				<Table>
					<TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
						<TableRow>
							<TableHead className="w-[30px]">E</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Author</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Modified Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{blogs.map((blog) => (
							<TableRow key={blog.id}>
								<TableCell className="font-medium">E</TableCell>
								<TableCell className={`text-blue-900 dark:text-blue-200`}>
									<Link href={`blog/${blog.id}`}>{blog.title || ""}</Link>
								</TableCell>
								<TableCell>{blog.author || ""}</TableCell>
								<TableCell>{blog.category || ""}</TableCell>
								<TableCell>{blog.status || ""}</TableCell>
								<TableCell>{blog.modifiedDate || ""}</TableCell>
							</TableRow>
						))}
						{/* <TableRow>
							<TableCell className="font-medium">E</TableCell>
							<TableCell className={`text-blue-900 dark:text-blue-200`}>
								<Link href={`blog/1`}>How to Make a Cake</Link>
							</TableCell>
							<TableCell>Amoke Emmanuel Chinonye</TableCell>
							<TableCell>Software Productivity</TableCell>
							<TableCell>Published</TableCell>
							<TableCell>5th Mar. 2025</TableCell>
						</TableRow> */}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
