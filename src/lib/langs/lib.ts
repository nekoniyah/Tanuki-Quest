// Library to manage language files for the Tanuki Quest project

let currentLang: string = 'en'; // Default language

export async function setLang(lang: 'en' | 'fr') {
	currentLang = lang;

	try {
		await import(/* @vite-ignore */ `./${currentLang}.json`);
	} catch {}
}

export async function trans(): Promise<(key: string) => string> {
	try {
		let data = await import(/* @vite-ignore */ `./${currentLang}.json`);
		return (key: string) => {
			let value = data;
			const keys = key.split('.');
			for (const key of keys) {
				value = value[key];
			}
			return value;
		};
	} catch (error) {
		return () => '';
	}
}
