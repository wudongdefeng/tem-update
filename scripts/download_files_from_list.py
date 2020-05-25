import os
from datetime import datetime


def download_with_wget(url, savepath, need_overwrite):
    if not os.path.exists(savepath):
        os.makedirs(savepath)

    filename = os.path.basename(url)
    if need_overwrite:
        print(f'Downloading data from {url}')
        os.system(f"wget {url} -O {os.path.join(savepath, filename)}")
        print(f'Download file {filename} finished!')
    else:
        print(f'Downloading data from {url}')
        os.system(f"wget {url} -nc -O {os.path.join(savepath, filename)}")
        print(f'Download file {filename} finished!')


def record_size(folder_path):
    folder_size = 0
    for filename in os.listdir(folder_path):
        # 获取文件大小
        folder_size += os.path.getsize(os.path.join(folder_path, filename))

    # 文件大小默认以Bytes计， 转换为MB
    msg = f'{datetime.now()} ==>> The size of all files in the folder {folder_path} = {folder_size / 1024 / 1024:.2f} MB'
    with open(os.path.join(folder_path, 'folder_size.txt'), encoding='utf-8', mode='w') as f:
        f.write(msg)

if __name__ == '__main__':
    input_path = '../links.txt'
    output_path = '../files'
    
    with open(input_path, encoding='utf-8', mode='r') as lst:
        # 以下载cifar-10数据集为例
        link_list = lst.readlines()
        link_list = [x.strip().split(',') for x in link_list]
    
    for link_info in link_list:
        assert len(link_info) == 2
        url, need_overwrite = [x.strip() for x in link_info]
        assert need_overwrite in ['0', '1']
        download_with_wget(url, savepath=output_path, need_overwrite=int( need_overwrite ))
        record_size(folder_path=output_path)
