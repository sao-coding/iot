type ContainerProps = {
  children: React.ReactNode
}

const Container = (props: ContainerProps) => {
  return <main className='mx-auto h-full max-w-5xl bg-slate-50'>{props.children}</main>
}

export default Container
