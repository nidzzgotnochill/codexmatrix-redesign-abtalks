const GITHUB = /^https:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/.*)?$/i;
const LINKEDIN = /^https:\/\/(www\.)?linkedin\.com\/.+$/i;

export const isGithubUrl = (v: string) => GITHUB.test(v.trim());
export const isLinkedinUrl = (v: string) => LINKEDIN.test(v.trim());