export const parseInput = (line) => {
  const trimmed = line.trim();
  
  if (!trimmed) {
    return { cmd: null, args: [] };
  }

  const [cmd, ...argsParts] = trimmed.split(/\s+/);
  const args = argsParts.length ? [argsParts.join(" ")] : [];

  return { cmd, args };
};
