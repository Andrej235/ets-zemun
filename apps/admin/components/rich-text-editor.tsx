"use client";

import dynamic from "next/dynamic";
import { ComponentProps, useMemo, useRef } from "react";
import imageCompression from "browser-image-compression";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useRef(null);

  const config = useMemo<ComponentProps<typeof JoditEditor>["config"]>(
    () => ({
      readonly: false,
      height: 700,
      theme: "dark",
      uploader: {
        insertImageAsBase64URI: true, // enables base64 images
      },
      events: {
        async beforePaste(e: ClipboardEvent) {
          const items = e.clipboardData?.items;
          if (!items) return;

          for (const item of items) {
            if (item.type.indexOf("image") === 0) {
              e.preventDefault();

              const file = item.getAsFile();
              if (!file) return;

              console.log("a");

              const compressedFile = await imageCompression(file, {
                maxWidthOrHeight: 1024,
                maxSizeMB: 0.2,
                useWebWorker: true,
              });

              const base64 =
                await imageCompression.getDataUrlFromFile(compressedFile);

              // Insert into the editor
              //eslint-disable-next-line
              (editor.current as any).editor.selection.insertImage(base64);
            }
          }
        },
        async onDrop(e: DragEvent) {
          const files = e.dataTransfer?.files;
          if (!files || files.length === 0) return;

          e.preventDefault();

          for (const file of Array.from(files)) {
            if (!file.type.startsWith("image/")) continue;

            const compressedFile = await imageCompression(file, {
              maxWidthOrHeight: 1024,
              maxSizeMB: 0.2,
              useWebWorker: true,
            });

            const base64 =
              await imageCompression.getDataUrlFromFile(compressedFile);
            //eslint-disable-next-line
            (editor.current as any).editor.selection.insertImage(base64);
          }
        },
      },
    }),
    [],
  );

  return (
    <JoditEditor ref={editor} value={value} config={config} onBlur={onChange} />
  );
}
