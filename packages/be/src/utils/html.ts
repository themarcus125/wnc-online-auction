export const tag = (t: string, content: string) => {
  return `<${t}>${content}</${t}>`;
};

export const anchorNewTab = (link: string, content: string) => {
  return `<a target="_blank" rel="noopener noreferrer" href="${link}">${content}</a>`;
};
