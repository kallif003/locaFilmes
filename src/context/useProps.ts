import { IUseProps } from "@/utils/interfaces";

const useProps = (): IUseProps => {
  const setTableBackground = (index: number) => {
    if (index % 2 == 0) {
      return { background: "#F5f5f5" };
    }

    return { background: "#cccc" };
  };

  const setTotalPages = (pages: number): number[] => {
    const totalPages = [];

    for (let i = 0; i <= pages - 1; i++) {
      totalPages.push(i);
    }

    return totalPages;
  };

  const handleAutoCompleteStyle = (value: string | undefined | null): any => {
    if (value) {
      return { background: "#fff", height: "3.5rem", fontWeight: "bold" };
    } else {
      return { background: "#f3f4f6", height: "3rem", fontWeight: "bold" };
    }
  };

  return {
    setTableBackground,
    setTotalPages,
    handleAutoCompleteStyle,
  };
};

export default useProps;
