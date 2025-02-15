import { questions } from "@/utils/placeholders";
import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useState } from "react";
import { CaretRight, DotsThreeOutline, List, Plus, Trash, X } from "phosphor-react";
import { auth, db } from "@/utils/firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

const TaskItem = ({ task, onTaskUpdated, onTaskRemoved }) => {
	const [taskText, setTaskText] = useState(task.content || "");
	const [showButton, setShowButton] = useState(!!task.content);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		setTaskText(task.content || "");
		setShowButton(!!task.content);
	}, [task]);

	const handleBlur = () => {
		if (taskText.trim() !== task.content) {
			onTaskUpdated(taskText, task.id);
		}
	};

	const handleTaskRemoval = () => {
		onTaskRemoved(task.id);
		setShowModal(false);
	};

	const handleTextChange = (e) => {
		const value = e.target.value;
		setTaskText(value);
		setShowButton(value.trim() !== "");
	};

	return (
		<Dialog.Root open={showModal} onOpenChange={setShowModal}>
			<div className="rounded-lg inline-block m-1 max-md:px-2 p-3 w-full lg:w-1/3 relative bg-white border-4 border-zinc-900 text-zinc-900 shadow-[8px_8px_0px_rgba(0,0,0,0.75)]">
				<div className="flex items-center gap-2 lg:gap-4 justify-between group">
					<div className="group-hover:visible cursor-grab bg-white hover:bg-gray-200 p-2 rounded-full">
						<List size={18} />
					</div>
					<div className="w-full">
						<input
							className="bg-transparent focus:outline-none w-full text-wrap text-ellipsis"
							type="text"
							placeholder="Digite sua tarefa"
							value={taskText}
							onChange={handleTextChange}
							onBlur={handleBlur}
						/>
					</div>
					{showButton && (
						<button
							className="bg-sky-700 hover:bg-sky-900 cursor-pointer text-white font-semibold py-1 px-3 rounded-3xl"
							onClick={handleTaskRemoval}
						>
							Concluir
						</button>
					)}
					<Dialog.Trigger
						className="lg:invisible group-hover:visible bg-white hover:bg-gray-200 p-2 rounded-full">
						<DotsThreeOutline size={18} />
					</Dialog.Trigger>
				</div>
			</div>

			<Dialog.Portal>
				<Dialog.DialogOverlay className="inset-0 fixed bg-black/20">
					<Dialog.DialogContent className="fixed z-10 inset-0 md:inset-auto max-md:top-[70%] lg:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-gray-200 max-md:rounded-t-3xl lg:rounded-3xl flex flex-col outline-none overflow-hidden">
						<Dialog.Close className="hover:bg-gray-300 p-2 rounded-full absolute top-2 right-2 text-zinc-900">
							<X className="size-5" />
						</Dialog.Close>
						<div className="flex items-center justify-center p-4">
							<div className="rounded-lg mt-8 inline-block w-5/6 relative text-zinc-900">
								<div className="flex flex-col items-center justify-center space-y-2">
									<span className="font-semibold text-zinc-900 text-lg">
										Mais opções
									</span>
									<div className="flex flex-col mt-6 space-y-4 font-semibold">
										<button className="flex items-center justify-between mb-2 px-3 rounded-md group ring-2 ring-red-600 py-2.5 hover:bg-red-400"
											onClick={handleTaskRemoval}>
											<Trash className="w-6 h-6 text-red-600 group-hover:text-white" />
											<span className="flex-grow ml-4 text-red-600 group-hover:text-white">Remover tarefa</span>
											<CaretRight className="text-red-600 group-hover:text-white" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Dialog.DialogContent>
				</Dialog.DialogOverlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [randomQuestion, setRandomQuestion] = useState("");
	const user = auth.currentUser;

	const fetchTasks = useCallback(async () => {
		if (!user?.uid) return;

		const tasksRef = collection(db, `users/${user.uid}/tarefas`);
		try {
			const snapshot = await getDocs(tasksRef);
			const fetchedTasks = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setTasks(fetchedTasks);
		} catch (error) {
			console.error("Erro ao buscar tarefas: ", error);
		}
	}, [user?.uid]);

	const onTaskUpdated = async (content, taskId) => {
		if (!user?.uid || !content.trim()) return;

		const taskData = {
			content: content.trim(),
			date: new Date().toISOString(),
		};

		try {
			if (taskId) {
				await updateDoc(doc(db, `users/${user.uid}/tarefas`, taskId), taskData);
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === taskId ? { ...task, ...taskData } : task
					)
				);
			} else {
				const docRef = await addDoc(collection(db, `users/${user.uid}/tarefas`), taskData);
				setTasks((prevTasks) => [...prevTasks, { ...taskData, id: docRef.id }]);
			}
		} catch (error) {
			console.error("Erro ao salvar tarefa: ", error);
		}
	};

	const onTaskRemoved = async (taskId) => {
		if (!taskId || !user?.uid) return;

		try {
			await deleteDoc(doc(db, `users/${user.uid}/tarefas`, taskId));
			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
		} catch (error) {
			console.error("Erro ao remover tarefa: ", error);
		}
	};

	useEffect(() => {
		const generateRandomQuestion = () => {
			const randomIndex = Math.floor(Math.random() * questions.length);
			return questions[randomIndex];
		};
		setRandomQuestion(generateRandomQuestion());
		fetchTasks();
	}, [fetchTasks]);

	const displayTasks = [...tasks];
	while (displayTasks.length < 5) {
		displayTasks.push({ id: null, content: "" });
	}

	return (
		<section className="min-h-screen">
			<div className="flex flex-col items-center pt-40 space-y-4 max-lg:px-4">
				<h1 className="bg-sky-700 text-white py-1 px-3 rounded-3xl font-semibold">Tarefas gerais</h1>
				<span className="text-white text-xl font-semibold">{randomQuestion}</span>
				{displayTasks.map((task, index) => (
					<TaskItem
						key={index}
						task={task}
						onTaskUpdated={onTaskUpdated}
						onTaskRemoved={onTaskRemoved}
					/>
				))}
			</div>
		</section>
	);
};
