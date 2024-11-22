import yauzl from 'yauzl';
import { Readable } from 'stream';

/**
 *  Extract files from an archive buffer
 * @param data - The archive data (Buffer or Readable stream)
 *  @returns An array of files extracted from the archive
 */

export async function extractFilesFromArchive(data: Readable | Buffer): Promise<File[]> {

    let zipBuffer: Buffer;

    if (data instanceof Readable) {
        // Convert the Readable stream into a Buffer
        const chunks: Uint8Array[] = [];
        for await (const chunk of data) {
            chunks.push(chunk)
        }
        zipBuffer = Buffer.concat(chunks);
    }
    else {
        zipBuffer = data
    };

    const files: File[] = [];

    /**
     *  @yauzl to extract files from the ZIP buffer
     */

    await new Promise<void>((resolve, reject) => {
        yauzl.fromBuffer(zipBuffer, { lazyEntries: true }, (err, zipfile) => {
            if (err) {
                reject(err);
                return;
            }
            if (!zipfile) {
                reject(new Error('Invalid ZIP file.'));
                return;
            }

            zipfile.readEntry();
            zipfile.on('entry', (entry) => {
                if (/\/$/.test(entry.fileName)) {
                    // Directory; ignore
                    zipfile.readEntry();
                } else {
                    // Process files
                    zipfile.openReadStream(entry, (e, readStream) => {
                        if (e) {
                            reject(e);
                            return;
                        }
                        if (!readStream) {
                            reject(new Error('Failed to read the ZIP file.'));
                            return;
                        }

                        const chunksArray: Uint8Array[] = [];
                        readStream.on('data', (chunk) => chunksArray.push(chunk));
                        readStream.on('end', () => {
                            const fileBuffer = Buffer.concat(chunksArray);
                            const file = new File([fileBuffer], entry.fileName);
                            files.push(file);
                            zipfile.readEntry();
                        });
                    });
                }
            });

            zipfile.on('end', () => resolve());
            zipfile.on('error', (error) => reject(error));
        });
    });

    return files;

}