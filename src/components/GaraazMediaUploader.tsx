import React, { useRef } from "react";
import { Button, Flex, IconButton, Img, Input } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";

interface GaraazMediaUploaderProps {
    handleDeleteProfilePicture: () => void;
    handleMediaInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    allowMimeType?: string;
    mediaSrc?: string;
    isMediaDeleting?: boolean;
    isMediaUploading?: boolean;
}

const GaraazMediaUploader: React.FC<GaraazMediaUploaderProps> = ({
    handleDeleteProfilePicture,
    handleMediaInputChange,
    allowMimeType = "image/*",
    mediaSrc,
    isMediaDeleting = false,
    isMediaUploading = false,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleAddMediaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Flex
            h="110%"
            w="15%"
            direction="column"
            border="0.5px solid lightgrey"
            position="absolute"
            right={4}
            top={0}
        >
            <Img
                src={
                    mediaSrc ??
                    "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                }
                alt="Profile picture"
                w="100%"
                h="85%"
            />
            {mediaSrc && (
                <IconButton
                    h="25px"
                    aria-label="Delete Profile"
                    isLoading={isMediaDeleting}
                    position="absolute"
                    top={0}
                    right={0}
                    onClick={handleDeleteProfilePicture}
                    p={0}
                    icon={<AiOutlineClose />}
                />
            )}
            <Input
                type="file"
                ref={fileInputRef}
                accept={allowMimeType}
                style={{ display: "none" }}
                onChange={handleMediaInputChange}
            />
            <Button
                h="15%"
                zIndex={1}
                isLoading={isMediaUploading}
                onClick={handleAddMediaClick}
                borderTopRadius={0}
                padding="4px 0"
                aria-label="Upload Media"
            >
                <BiUpload size="25px" />
            </Button>
        </Flex>
    );
};

export default GaraazMediaUploader;
