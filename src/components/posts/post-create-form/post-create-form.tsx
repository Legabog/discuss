"use client";

import { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";

import { FormButton } from "@/components";
import { createPost } from "@/actions";
import { Props } from "./types";

export const PostCreateForm: FC<Props> = ({ slug }) => {
  const [formState, action] = useFormState(createPost.bind(null, slug), {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="title"
              label="title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Input
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form && (
              <div className="p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            )}
            <FormButton>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
