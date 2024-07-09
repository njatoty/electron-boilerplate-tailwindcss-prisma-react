import React from 'react';
import OSApi from '../os-api';

const Hello = () => {
  const [state, setState] = React.useState<any>([]);

  const fetch = async () => {
    const r = await OSApi.prisma().user.findMany();
    setState(r);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  const rand = (length: number) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const add = async () => {
    const e = {
      data: {
        name: rand(5),
        email: rand(10),
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    };

    await OSApi.prisma().user.create(e);

    fetch();
  };

  return (
    <div>
      <h1 className="text-orange-500 font-bold text-3xl">Data</h1>
      <pre>{JSON.stringify(state, null, 3)}</pre>
      <button type="button" onClick={() => add()}>
        ADD
      </button>
    </div>
  );
};

export default Hello;
