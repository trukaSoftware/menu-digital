'use client';

import { useUser } from '@clerk/nextjs';

export default function CreateCompany() {
  const { user } = useUser();

  return (
    <div className="flex-col justify-center items-center p-96">
      <h1 className="text-9xl text-center">
        Aqui vai um formulario para cadastrar a company
      </h1>
      {user?.id ? (
        <p className="text-4xl text-center">{`id do usuario: ${user.id}`}</p>
      ) : null}
    </div>
  );
}
