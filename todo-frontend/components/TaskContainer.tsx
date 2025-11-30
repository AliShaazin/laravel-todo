const TaskContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="py-20 container mx-auto max-w-7xl grid grid-cols-3 gap-10 ">
      {children}
    </section>
  );
};

export default TaskContainer;
