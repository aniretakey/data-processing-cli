export const parseInput = (line) => {
  const trimmed = line.trim();

  if (!trimmed) {
    return { cmd: null, args: [] };
  }

  const [cmd, ...argsParts] = trimmed.split(/\s+/);
  const args = argsParts.length ? [argsParts.join(" ")] : [];

  return { cmd, args, argsParts };
};

export const parseHashArgs = (args) => {
  let file = null;
  let algorithm = "sha256";
  let save = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--input" && i + 1 < args.length) {
      file = args[i + 1];
      i++;
    }

    if (arg === "--algorithm" && i + 1 < args.length) {
      algorithm = args[i + 1];
      i++;
    }

    if (arg === "--save") {
      save = true;
    }
  }

  return { file, algorithm, save };
};

export const parseHashCompareArgs = (args) => {
  let file = null;
  let hashFile = null;
  let algorithm = "sha256";

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--input" && i + 1 < args.length) {
      file = args[i + 1];
      i++;
    }

    if (arg === "--algorithm" && i + 1 < args.length) {
      algorithm = args[i + 1];
      i++;
    }

    if (arg === "--hash") {
      hashFile = args[i + 1];
      i++;
    }
  }

  return { file, hashFile, algorithm };
};
