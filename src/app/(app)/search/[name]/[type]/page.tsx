interface SearchProps {
  params: {
    name: string;
    type: string;
  };
}
export default async function Search({ params }: SearchProps) {
  return <div>{JSON.stringify(params)}</div>;
}
