'use client'

import { useRef } from 'react'
import { Label } from "@/components/ui/label"
import { Upload } from 'lucide-react'
import Image from 'next/image'

interface CustomFileInputProps {
    initialImage?: string | File
    selectedFile?: File | null
    setSelectedFile: (file: File | null) => void
}

export default function CustomFileInput({ initialImage, selectedFile, setSelectedFile }: CustomFileInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const imageUrl = selectedFile
        ? URL.createObjectURL(selectedFile)
        : initialImage || null

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={handleClick}
            >
                {imageUrl ? (
                    <Image
                        src={typeof imageUrl === 'string' ? imageUrl : URL.createObjectURL(imageUrl)}
                        alt="Selected file or initial image"
                        className="max-w-full h-auto mx-auto"
                        width={150}
                        height={150}
                    />
                ) : (
                    // Handle the case where imageUrl is null
                    <div className="flex flex-col items-center justify-center h-32">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload an image</p>
                    </div>
                )}
            </div>
            <input
                ref={fileInputRef}
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            {selectedFile && (
                <p className="text-sm text-gray-500 mt-2">
                    Selected file: {selectedFile.name}
                </p>
            )}
        </div>
    )
}
